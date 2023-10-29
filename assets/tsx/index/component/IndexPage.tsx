import React from "react";
import Button from "react-bootstrap/Button";

interface ViewModel {
    title: string,
}

const IndexPage = ({title}: ViewModel) => {
    return (
        <>
            <h1>Index Page</h1>
            <Button type="button" className="btn btn-primary">{ title }</Button>
        </>
    );
};

export default IndexPage;