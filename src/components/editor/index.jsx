import Quill from 'quill';
import ImageResize from 'quill-image-resize-module-react';
Quill.register('modules/imageResize', ImageResize);


export const modules = {
  imageResize: {
    parchment: Quill.import('parchment'),
    modules: ['Resize', 'DisplaySize']
 },
  toolbar: [
    [{ 'header': '1'}, {'header': '2'}, {'header': '3'}, { 'font': [] }],
    [{size: []}],
    [{align: []}],
    [{ 'color': [] }],
    [{ 'background': [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'},
     {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image',  'video'],
    ['clean'],
    ['colorPicker'],
  ],


  clipboard: {
    matchVisual: false,
  }
}
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
 export const formats = [
  'header', 'font', 'size', 'align', 'color', 'background',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video'
]
