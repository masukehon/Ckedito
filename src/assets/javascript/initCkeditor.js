export function initCkeditor() {
    CKEDITOR.config.height = 500;
    CKEDITOR.replace('ckeditor', {
        extraPlugins: 'imagebrowser',
        imageBrowser_listUrl: 'http://localhost:4000/upload/image-on-aws'
    });
}