export function test2() {
    CKEDITOR.replace('editor1', {
        extraPlugins: 'imagebrowser',
        imageBrowser_listUrl: 'http://localhost:4000/upload/files'
    })
}