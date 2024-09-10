import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeHighlight from 'rehype-highlight';
import { Controlled as CodeMirror } from 'react-codemirror2';
import { message } from 'antd';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/python/python';
import 'katex/dist/katex.min.css';
import 'highlight.js/styles/github.css';
import '../css/FunctionPage.css';

function FunctionPage() {
    const [markdown, setMarkdown] = useState('');

    useEffect(() => {
        fetch(`${process.env.PUBLIC_URL}/Notes/MyFirstQuantNote/Quant_4.md`)
            .then(response => response.text())
            .then(text => setMarkdown(text));
    }, []);

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        message.success('copied successfully!'); 
    };

    return (
        <div>
            <ReactMarkdown
                children={markdown}
                remarkPlugins={[remarkMath]}
                rehypePlugins={[rehypeKatex, rehypeHighlight]}
                components={{
                    code({ node, inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || '');
                        const language = match ? match[1] : 'python';
                        let codeString = '';

                        if (Array.isArray(children)) {
                            codeString = children.map((child) => {
                                if (typeof child === 'string') {
                                    return child;
                                } else if (typeof child === 'object' && child.props && child.props.children) {
                                    return child.props.children;
                                }
                                return '';
                            }).join('');
                        } else if (typeof children === 'string') {
                            codeString = children;
                        } else if (typeof children === 'object' && children.props && children.props.children) {
                            codeString = children.props.children;
                        }

                        const lineCount = codeString.split('\n').length;
                        console.log(lineCount);

                        return !inline ? (
                            <div style={{ position: 'relative', marginBottom: '1em' }}>
                                <button
                                    onClick={() => handleCopy(codeString)}
                                    style={{
                                        position: 'absolute',
                                        right: '22%',
                                        top: '10px',
                                        zIndex: 1,
                                        background: 'white',
                                        border: '1px solid #ccc',
                                        borderRadius: '3px',
                                        padding: '0.2em 0.5em',
                                        cursor: 'pointer'
                                    }}
                                >
                                    copy
                                </button>
                                <CodeMirror
                                    value={codeString}
                                    options={{
                                        mode: language,
                                        theme: 'material',
                                        lineNumbers: true,
                                        readOnly: 'nocursor'
                                    }}
                                    {...props}
                                />
                            </div>
                        ) : (
                            <code className={className} {...props}>
                                {children}
                            </code>
                        );
                    },
                    img({ node, ...props }) {
                        return <img {...props} style={{ maxWidth: '100%' }} alt={props.alt} />;
                    }
                }}
            />
        </div>
    );
}

export default FunctionPage;