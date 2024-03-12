import React, { useEffect } from "react";
import { useForm, FieldValues } from "react-hook-form";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import useApiRequest, { ApiRequestData, redirect } from "../../hooks/ApiRequest";
import { Setting } from "../../interfaces/ContainerProps";
import { Floppy } from "../icons/Icons";

enum Language {
    GERMAN = "GERMAN",
    ENGLISH = "ENGLISH",
}

enum Model {
    WHISPER = "WHISPER",
    VOSK = "VOSK",
    GOOGLE = "GOOGLE",
}

interface SettingFormData extends ApiRequestData {
    language: Language;
    model: Model;
}

const SettingForm = ({ language, model }: Setting) => {
    const { post, data } = useApiRequest();
    const {
        register,
        handleSubmit,
    } = useForm({ defaultValues: { language, model } });
    const onSubmit = (settingsData: FieldValues): void => {
        post("/settings", { ...settingsData } as SettingFormData, true);
    };

    useEffect(() => {
        // console.log(data);

        if (data.status === 200) {
            return redirect("/");
        }
    }, [ data ]);

    return (
        <Form noValidate onSubmit={ handleSubmit(onSubmit) }>
            <Form.Group className="mb-3" controlId="setting-language">
                <Form.Label className="mb-3">Language:</Form.Label>
                <Form.Check
                    className="mb-2"
                    type="radio"
                    label="German"
                    id="german"
                    value={ Language.GERMAN }
                    { ...register("language") }
                />
                <Form.Check
                    className="mb-2"
                    type="radio"
                    label="English"
                    id="english"
                    value={ Language.ENGLISH }
                    { ...register("language") }
                />
            </Form.Group>

            <Form.Group className="mb-4" controlId="setting-model">
                <Form.Label className="mb-3">Speech model:</Form.Label>
                <Form.Check
                    className="mb-2"
                    type="radio"
                    label="Whisper (Default)"
                    id="whisper"
                    value={ Model.WHISPER }
                    { ...register("model") }
                />
                <Form.Check
                    className="mb-2"
                    type="radio"
                    label="Vosk"
                    id="vosk"
                    value={ Model.VOSK }
                    { ...register("model") }
                />
                <Form.Check
                    className="mb-2"
                    type="radio"
                    label="Google"
                    id="google"
                    value={ Model.GOOGLE }
                    { ...register("model") }
                />
            </Form.Group>

            <Button variant="primary" type="submit">
                <Floppy /> <span className="ms-1">Save</span>
            </Button>
        </Form>
    );
}
    ;

export default SettingForm;;
