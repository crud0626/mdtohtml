import React, { useCallback } from 'react';
import styles from '../../styles/output.module.scss';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkEmoji from 'remark-emoji';
import remarkBreaks from "remark-breaks";

interface IProps {
    inputValue: string | ArrayBuffer;
}

const Output = React.forwardRef<HTMLDivElement, IProps>(({ inputValue }, ref) => {
    const handleNoteEffect = useCallback(({ target }: React.MouseEvent) => {
        const clickedNotes = document.querySelectorAll(".clicked-note");
        if (clickedNotes) clickedNotes.forEach(elem => elem.classList.remove("clicked-note"));

        if (target instanceof HTMLElement && target.matches("sup")) {
            const anchorElem = target.closest(".footnote-ref");

            if (anchorElem instanceof HTMLAnchorElement) {
                const targetId = anchorElem.href.match(/fn\d$/);

                if (targetId) {
                    const targetNote = document.querySelector(`#${targetId[0]}`);
                    targetNote?.classList.add("clicked-note");
                }
            }
        }
    }, []);

    return(
        <div id='outputbox' ref={ref} className={styles.box} onClick={handleNoteEffect}>
            {
                typeof inputValue === "string" &&
                <ReactMarkdown 
                children={inputValue} 
                remarkPlugins={[remarkGfm, remarkEmoji, remarkBreaks]} 
                components={{
                    a: ({ node, children, ...props}) => {
                        if(!(props.role === "doc-backlink" || props.role === "doc-noteref")) {
                           props['target'] = '_blank';
                           props['rel'] = 'noopener noreferrer';
                        }
                        
                        return <a {...props}>{children}</a>;
                    }}
                }
             />
            }
         </div>
    );
});

export default Output;
