export function getValueCkeditor(cb) {
    function changeEvent(evt) {
        if (evt.editor) return cb(evt.editor.getData());
        return cb(null, "Loi roi!");
    }

    CKEDITOR.instances['ckeditor'].on('change', changeEvent);
}
