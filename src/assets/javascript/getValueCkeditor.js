export function getValueCkeditor(cb) {
    var editor = CKEDITOR.replace('ckeditor', {
        extraPlugins: 'imagebrowser',
        imageBrowser_listUrl: 'http://localhost:4000/upload/files'
    })

    editor.on('change', evt => {
        if (evt.editor) return cb(evt.editor.getData());
        return cb(null, "Loi roi!");
    });
}
