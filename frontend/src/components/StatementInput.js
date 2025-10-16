import './StatementInput.css'
import { useState } from 'react';

export default function StatementInput() {
    const [inputFile, setInputFile] = useState();
    const [submissionFeedback, setSubmissionFeedback] = useState('')
    
    
    const handleSubmitInput = (e) => {
        e.preventDefault();

        if (!inputFile) {
            setSubmissionFeedback('Please select a file before submitting.')
            return;
        }

        const formData = new FormData();
        formData.append("statement", inputFile);
        setSubmissionFeedback('Successfully submitted! Loading...');
    }

    const handleSubmitInputChange = (e) => {
        setInputFile(e.target.files[0]);
    }

    return (
        <div className='statement-input-container'>
            <h2 className='statement-input-header'>Input your statement as a .pdf here:</h2>
            <input type='file' className='statement-input-input' onChange={handleSubmitInputChange}></input>
            <button className='statement-input-submit' onClick={handleSubmitInput}> Submit Statement</button>
            <p className="statement-input-submission-feedback">{submissionFeedback}</p>
        </div>
    )
} 