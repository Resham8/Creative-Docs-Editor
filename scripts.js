const editor = document.getElementById('editor');

function execCmd(command, value = null) {
    document.execCommand(command, false, value);
    editor.focus();
}

document.getElementById('newBtn').addEventListener('click', () => {
    if (confirm('Are you sure you want to create a new document? All unsaved changes will be lost.')) {
        editor.innerHTML = '';
    }
});

document.getElementById('saveBtn').addEventListener('click', () => {
    const content = editor.innerHTML;
    const blob = new Blob([content], {type: 'text/html'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'document.html';
    a.click();
});

document.getElementById('printBtn').addEventListener('click', () => {
    window.print();
});

document.getElementById('boldBtn').addEventListener('click', () => execCmd('bold'));
document.getElementById('italicBtn').addEventListener('click', () => execCmd('italic'));
document.getElementById('underlineBtn').addEventListener('click', () => execCmd('underline'));

document.getElementById('alignLeftBtn').addEventListener('click', () => execCmd('justifyLeft'));
document.getElementById('alignCenterBtn').addEventListener('click', () => execCmd('justifyCenter'));
document.getElementById('alignRightBtn').addEventListener('click', () => execCmd('justifyRight'));
document.getElementById('alignJustifyBtn').addEventListener('click', () => execCmd('justifyFull'));

document.getElementById('fontName').addEventListener('change', (e) => execCmd('fontName', e.target.value));
document.getElementById('fontSize').addEventListener('change', (e) => execCmd('fontSize', e.target.value));
document.getElementById('colorPicker').addEventListener('input', (e) => execCmd('foreColor', e.target.value));

document.getElementById('insertImageBtn').addEventListener('click', () => {
    const url = prompt('Enter the URL of the image:');
    if (url) execCmd('insertImage', url);
});

document.getElementById('insertTableBtn').addEventListener('click', () => {
    const rows = prompt('Enter the number of rows:');
    const cols = prompt('Enter the number of columns:');
    if (rows && cols) execCmd('insertTable', `<table border="1"><tbody>${'<tr>'.repeat(rows)}${'<td></td>'.repeat(cols)}</tr></tbody></table>`);
});

function updateWordCount() {
    const text = editor.innerText || editor.textContent;
    const wordCount = text.split(/\s+/).filter(word => word.length > 0).length;
    document.getElementById('wordCount').textContent = `Words: ${wordCount}`;
}

editor.addEventListener('input', updateWordCount);

// Autosave
setInterval(() => {
    localStorage.setItem('editorContent', editor.innerHTML);
}, 5000);

// Load saved content
window.addEventListener('load', () => {
    const savedContent = localStorage.getItem('editorContent');
    if (savedContent) {
        editor.innerHTML = savedContent;
        updateWordCount();
    }
});
