import { React, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeHighlight from "rehype-highlight";
import mermaid from "mermaid";
import { message } from "antd";
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/python/python';
import 'katex/dist/katex.min.css';
import 'highlight.js/styles/github.css';
import { Controlled as CodeMirror } from 'react-codemirror2';

/**
 * MyReactMarkdown:一个自定义的ReactMarkdown组件
 * @param {string} markdown - 一个markdown文本
 * @param {string} noteUrl - 一个markdown文本的URL地址
 * @returns {JSX.Element}
 */

const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    message.success('copied successfully!'); 
};


const MyReactMarkdown = ({markdown, noteUrl}) => {
    useEffect(() => {
        mermaid.initialize({ startOnLoad: true });
        setTimeout(() => mermaid.contentLoaded(), 100);
    }, [markdown]);
    return (
    <ReactMarkdown
        children={markdown}
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex, rehypeHighlight]}
        components={{
            // Normally, in markdown, those are: a, blockquote, br, code, em, h1, h2, h3, h4, h5, h6, hr, img, li, ol, p, pre, strong, and ul.
            code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                const language = match ? match[1] : 'python';
                
                let codeString = '';

                // let result = '';
                // let stack = Array.isArray(children) ? [...children] : [children];

                // while (stack.length > 0) {
                //     const child = stack.pop();
                //     if (typeof child === 'string') {
                //         result = child + result;
                //     } else if (typeof child === 'object' && child.props && child.props.children) {
                //         stack = stack.concat(child.props.children);
                //     }
                // }

                // codeString = result;
                const extractText = (children) => {
                    let result = '';
                    let stack = Array.isArray(children) ? [...children] : [children];

                    while (stack.length > 0) {
                        const child = stack.pop();
                        if (typeof child === 'string') {
                            result = child + result;
                        } else if (typeof child === 'object' && child.props && child.props.children) {
                            stack = stack.concat(child.props.children);
                        }
                    }

                    return result;
                };

                codeString = extractText(children);

                if (language === 'mermaid') {
                    console.log(codeString);
                    console.log(children);
                    return <pre className="mermaid">{children}</pre>;
                }

                return !inline ? (
                    <div style={{ position: 'relative', marginBottom: '1em' }}>
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
                return <img 
                            {...props} 
                            src={`${process.env.PUBLIC_URL}/`+noteUrl+`${props.src}`}
                            style={{ maxWidth: '100%' }} 
                            alt={props.alt} 
                        />;
            },
            h1({ node, ...props }) {
                return <h1 {...props} style={{ color: 'black',fontSize:'50px' }}>
                    {props.children && props.children.length > 0 ? props.children : 'Heading'}
                </h1>;
            },
            h2({ node, ...props }) {
            return <h2 {...props} style={{ color: 'black',fontSize:'30px' }}>
                {props.children && props.children.length > 0 ? props.children : 'Subheading'}
            </h2>;
            },
            h3({ node, ...props }) {
            return <h2 {...props} style={{ color: 'black',fontSize:'20px' }}>
                {props.children && props.children.length > 0 ? props.children : 'Subheading'}
            </h2>;
            },
            h4({ node, ...props }) {
            return <h2 {...props} style={{ color: 'black',fontSize:'15px' }}>
                {props.children && props.children.length > 0 ? props.children : 'Subheading'}
            </h2>;
            },
            h5({ node, ...props }) {
            return <h2 {...props} style={{ color: 'black',fontSize:'10px' }}>
                {props.children && props.children.length > 0 ? props.children : 'Subheading'}
            </h2>;
            },
            p({ node, ...props }) {
            return <p {...props} style={{ fontSize: '16px' }} />;
            },
            a({ node, ...props }) {
            return <a {...props} style={{ color: 'ice' }}>
                {props.children && props.children.length > 0 ? props.children : 'Link'}
            </a>;
            },
            ul({ node, ...props }) {
            return <ul {...props} style={{ listStyleType: 'circle' }} />;
            },
            li({ node, ...props }) {
            return <li {...props} style={{ marginBottom: '0.5em' }} />;
            },
            br({ node, ...props }) {
            return <br {...props} />;
            }
        }}
    />
    );
}

export default MyReactMarkdown;