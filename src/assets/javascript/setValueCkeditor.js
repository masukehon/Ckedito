export function setValueCkeditor(data) {
    return CKEDITOR.instances['ckeditor'].setData(data);
}