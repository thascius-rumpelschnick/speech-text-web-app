import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import "./Recorder.scss";

// Handlers

export function deleteAudio(audioKey: string, setRecordings: SetRecordings) {
    setRecordings((prevState) => prevState.filter((record) => record.key !== audioKey));
}

export async function startRecording(setRecorderState: SetRecorder) {
    try {
        const stream: MediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });

        setRecorderState((prevState) => {
            return {
                ...prevState,
                initRecording: true,
                mediaStream: stream,
            };
        });
    } catch (err) {
        console.log(err);
    }
}

export function saveRecording(recorder: unknown) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (recorder?.state !== "inactive") recorder?.stop();
}

// Hooks

export function useRecordingsList(audio: string | null) {
    const [ recordings, setRecordings ] = useState<Audio[]>([]);

    useEffect(() => {
        if (audio)
            setRecordings((prevState: Audio[]) => {
                return [ ...prevState, { key: generateKey(), audio } ];
            });
    }, [ audio ]);

    return {
        recordings,
        deleteAudio: (audioKey: string) => deleteAudio(audioKey, setRecordings),
    };
}

const initialState: RecorderState = {
    recordingMinutes: 0,
    recordingSeconds: 0,
    initRecording: false,
    mediaStream: null,
    mediaRecorder: null,
    audio: null,
};

export function useRecorder() {
    const [ recorderState, setRecorderState ] = useState<RecorderState>(initialState);

    useEffect(() => {
        const MAX_RECORDER_TIME = 5;
        let recordingInterval: Interval = null;

        if (recorderState.initRecording)
            recordingInterval = setInterval(() => {
                setRecorderState((prevState: RecorderState) => {
                    if (
                        prevState.recordingMinutes === MAX_RECORDER_TIME &&
                        prevState.recordingSeconds === 0
                    ) {
                        typeof recordingInterval === "number" && clearInterval(recordingInterval);
                        return prevState;
                    }

                    if (prevState.recordingSeconds >= 0 && prevState.recordingSeconds < 59)
                        return {
                            ...prevState,
                            recordingSeconds: prevState.recordingSeconds + 1,
                        };
                    else if (prevState.recordingSeconds === 59)
                        return {
                            ...prevState,
                            recordingMinutes: prevState.recordingMinutes + 1,
                            recordingSeconds: 0,
                        };
                    else return prevState;
                });
            }, 1000);
        else typeof recordingInterval === "number" && clearInterval(recordingInterval);

        return () => {
            typeof recordingInterval === "number" && clearInterval(recordingInterval);
        };
    });

    useEffect(() => {
        setRecorderState((prevState) => {
            if (prevState.mediaStream)
                return {
                    ...prevState,
                    mediaRecorder: new MediaRecorder(prevState.mediaStream),
                };
            else return prevState;
        });
    }, [ recorderState.mediaStream ]);

    useEffect(() => {
        const recorder = recorderState.mediaRecorder;
        let chunks: Blob[] = [];

        if (recorder && recorder.state === "inactive") {
            recorder.start();

            recorder.ondataavailable = (e: MediaRecorderEvent) => {
                chunks.push(e.data);
            };

            recorder.onstop = () => {
                const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
                chunks = [];

                setRecorderState((prevState: RecorderState) => {
                    if (prevState.mediaRecorder)
                        return {
                            ...initialState,
                            audio: window.URL.createObjectURL(blob),
                        };
                    else return initialState;
                });
            };
        }

        return () => {
            if (recorder) recorder.stream.getAudioTracks().forEach((track: AudioTrack) => track.stop());
        };
    }, [ recorderState.mediaRecorder ]);

    return {
        recorderState,
        startRecording: () => startRecording(setRecorderState),
        cancelRecording: () => setRecorderState(initialState),
        saveRecording: () => saveRecording(recorderState.mediaRecorder),
    };
}

// Types

export type RecorderState = {
    recordingMinutes: number;
    recordingSeconds: number;
    initRecording: boolean;
    mediaStream: MediaStream | null;
    mediaRecorder: MediaRecorder | null;
    audio: string | null;
};

export type UseRecorder = {
    recorderState: RecorderState;
    startRecording: () => void;
    cancelRecording: () => void;
    saveRecording: () => void;
};

export type RecorderControlsProps = {
    recorderState: RecorderState;
    handlers: {
        startRecording: () => void;
        cancelRecording: () => void;
        saveRecording: () => void;
    };
};

export type RecordingsListProps = {
    audio: string | null;
};

export type Audio = {
    key: string;
    audio: string;
};

export type Interval = null | number | ReturnType<typeof setInterval>;
export type SetRecorder = Dispatch<SetStateAction<RecorderState>>;
export type SetRecordings = Dispatch<SetStateAction<Audio[]>>;
export type AudioTrack = MediaStreamTrack;
export type MediaRecorderEvent = {
    data: Blob;
};

// Utils

export function formatMinutes(minutes: number) {
    return minutes < 10 ? `0${ minutes }` : `${ minutes }`;
}

export function formatSeconds(seconds: number) {
    return seconds < 10 ? `0${ seconds }` : `${ seconds }`;
}

export function generateKey() {
    return crypto.randomUUID();
}

// Components

export function RecorderControls({ recorderState, handlers }: RecorderControlsProps) {
    const { recordingMinutes, recordingSeconds, initRecording } = recorderState;
    const { startRecording, saveRecording, cancelRecording } = handlers;

    return (
        <div className="controls-container">
            <div className="recorder-display">
                <div className="recording-time">
                    { initRecording && <div className="recording-indicator"></div> }
                    <span>{ formatMinutes(recordingMinutes) }</span>
                    <span>:</span>
                    <span>{ formatSeconds(recordingSeconds) }</span>
                </div>
                { initRecording && (
                    <div className="cancel-button-container">
                        <button className="cancel-button" title="Cancel recording" onClick={ cancelRecording }>
                            {/*<FontAwesomeIcon icon={ faTimes }/>*/ }
                        </button>
                    </div>
                ) }
            </div>
            <div className="start-button-container">
                { initRecording ? (
                    <button
                        className="start-button"
                        title="Save recording"
                        disabled={ recordingSeconds === 0 }
                        onClick={ saveRecording }
                    >
                        {/*<FontAwesomeIcon icon={ faSave } size="2x"/>*/ }
                    </button>
                ) : (
                    <button className="start-button" title="Start recording" onClick={ startRecording }>
                        {/*<FontAwesomeIcon icon={ faMicrophone } size="2x"/>*/ }
                    </button>
                ) }
            </div>
        </div>
    );
}

export function RecordingsList({ audio }: RecordingsListProps) {
    const { recordings, deleteAudio } = useRecordingsList(audio);

    return (
        <div className="recordings-container">
            { recordings.length > 0 ? (
                <>
                    <h1>Your recordings</h1>
                    <div className="recordings-list">
                        { recordings.map((record) => (
                            <div className="record" key={ record.key }>
                                <audio controls src={ record.audio }/>
                                <div className="delete-button-container">
                                    <button
                                        className="delete-button"
                                        title="Delete this audio"
                                        onClick={ () => deleteAudio(record.key) }
                                    >
                                        {/*<FontAwesomeIcon icon={ faTrashAlt }/>*/}
                                    </button>
                                </div>
                            </div>
                        )) }
                    </div>
                </>
            ) : (
                <div className="no-records">
                    {/*<FontAwesomeIcon icon={ faExclamationCircle } size="2x" color="#f2ea02"/>*/}
                    <span>You don&apos;t have records</span>
                </div>
            ) }
        </div>
    );
}

// App

const Recorder = () => {
    const { recorderState, ...handlers }: UseRecorder = useRecorder();
    const { audio } = recorderState;

    return (
        <section className="voice-recorder">
            <h1 className="title">Voice Recorder</h1>
            <div className="recorder-container">
                <RecorderControls recorderState={ recorderState } handlers={ handlers }/>
                <RecordingsList audio={ audio }/>
            </div>
        </section>
    );
};

export default Recorder;