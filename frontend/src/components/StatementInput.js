import './StatementInput.css'

export default function StatementInput() {
    return (
        <div className='statement-input-container'>
            <h2 className='statement-input-header'>Input your statement as a .pdf here:</h2>
            <input type='file' className='statement-input-input'></input>
            <button className='statement-input-submit'> Submit Statement</button>
        </div>
    )
} 