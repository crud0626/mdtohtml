import React, { useCallback, useRef, useState } from 'react';
import Buttons from '../buttons/buttons';
import Cheatsheet from '../cheatsheet/cheatsheet';
import Input from '../input/input';
import Output from '../output/output';
import styles from './section.module.css';

const Section = ({isSheet}) => {
    const [text, setText] = useState("# MD TO HTML\nHello, This is a site that converts markdown into html.\n## Features\n1. You can download it to markdown(.md) or html(.txt)\n2. If you have an already written md file, you can upload it.\n3. The result is the same as Github\n4. It is free!\n\n---\n\n> Thank you, enjoy!");

    const outputRef = useRef();

    const changeFormValue = (event) => {
        setText(event.target.value);
    }

    const onClickEraser = useCallback(() => {
        setText("");
    },[])

    const copyText = () => {
        const tooltip = document.querySelector("#copyTooltip");
        const inputArea = document.querySelector('#inputbox');
        if (inputArea.value) {
            navigator.clipboard.writeText(inputArea.value)
            .then(() => {
                tooltip.innerText = "Copied!";

            })
            .then(setTimeout(() => {
                tooltip.innerText = "Copy";
            }, 1500))
            .catch(error => console.log(`Failed copy! : ${error}`))
        }
    }

    const uploadTextFile = (event) => {
        event.preventDefault();
        let uploadedFile = "";
        if (event.type === "drop") {
            uploadedFile = event.dataTransfer.files[0];
        } else {
            uploadedFile = event.target.files[0];
        }
        const file = new FileReader();
        file.onload = () => {
            setText(file.result);
        }
        file.readAsText(uploadedFile);
    }

    const downloadFile = (event) => {
        let link = document.createElement("a");
        let data = "";
        if (event.target.dataset.title) {
            data = outputRef.current.innerHTML;
            link.download = "mdtohtml.html";
        } else {
            data = text;
            link.download = "README.md";
        }
        const blob = new Blob([data], {type: "text/plain"})
        link.href = window.URL.createObjectURL(blob);
        link.click();
    }

    return (
        <>
        <section className={styles.section_container}>
            <Buttons 
                copyText={copyText}
                uploadTextFile={uploadTextFile}
                downloadFile={downloadFile}
            />
            <div className={styles.section}>
                <Input 
                    changeFormValue={changeFormValue}
                    onClickEraser={onClickEraser}
                    dragFile={uploadTextFile}
                    text={text}
                />
                <Output 
                    text={text} 
                    ref={outputRef}
                />
            </div>
            {isSheet && <Cheatsheet />}
        </section>
        </>
    );
}

export default Section;