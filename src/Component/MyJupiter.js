import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import 'katex/dist/katex.min.css';
import 'highlight.js/styles/github.css';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/python/python';
import { message } from "antd";

const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    message.success('copied successfully!');
};

const MyJupiter = ({ path, pyodide }) => {
    const [notebookContent, setNotebookContent] = useState([]);

    useEffect(() => {
        const fetchNotebook = async () => {
            try {
                const response = await fetch(path);
                const notebook = await response.json();
                setNotebookContent(notebook.cells);
            } catch (error) {
                console.error("Error fetching notebook content:", error);
            }
        };

        fetchNotebook();
    }, [path]);

    return (
        <div style={{ width: "100%", height: "100%", overflow: "auto" }}>
            {notebookContent.map((cell, index) => {
                if (cell.cell_type === "markdown") {
                    return (
                        <div key={index}>
                            <ReactMarkdown
                                children={cell.source.join("")}
                                remarkPlugins={[remarkMath]}
                                rehypePlugins={[rehypeKatex]}
                            />
                        </div>
                    );
                } else if (cell.cell_type === "code") {
                    const codeString = cell.source.join("");
                    return (
                        <div key={index} style={{ position: 'relative', marginBottom: '1em' }}>
                            <button
                                onClick={() => handleCopy(codeString)}
                                style={{
                                    position: 'absolute',
                                    right: '10px',
                                    top: '10px',
                                    zIndex: 1,
                                    background: 'white',
                                    border: '1px solid #ccc',
                                    borderRadius: '3px',
                                    padding: '0.2em 0.5em',
                                    cursor: 'pointer',
                                    opacity: 0.5
                                }}
                            >
                                copy
                            </button>
                            <style>
                                {`
                                    .CodeMirror {
                                        height: auto;
                                    }
                                `}
                            </style>
                            <CodeMirror
                                value={codeString}
                                options={{
                                    mode: 'python',
                                    theme: 'material',
                                    lineNumbers: true,
                                    readOnly: 'nocursor'
                                }}
                            />
                        </div>
                    );
                } else {
                    return null;
                }
            })}
        </div>
    );
};

export default MyJupiter;