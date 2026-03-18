import { useEditor, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
// @ts-ignore: no type declarations for @tiptap/extension-image
import Image from '@tiptap/extension-image';

const editor = useEditor({
  extensions: [
    StarterKit,
    Placeholder.configure({ placeholder: 'Start typing...' }),
    Image,
  ],
  content,
  onUpdate: ({ editor }: { editor: Editor }) => {
    onChange(editor.getHTML());
  },
  editorProps: {
    attributes: {
      class:
        'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none',
    },
  },
});