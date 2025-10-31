'use client'

import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Bold, Italic, Underline, List, ListOrdered } from 'lucide-react'
import { useState, useRef } from 'react'

interface RichTextEditorProps {
  content: string
  onChange: (content: string) => void
  placeholder?: string
  disabled?: boolean
}

export function RichTextEditor({ content, onChange, placeholder, disabled = false }: RichTextEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [isHtmlMode, setIsHtmlMode] = useState(false)

  const insertText = (before: string, after: string = '') => {
    if (!textareaRef.current) return

    const textarea = textareaRef.current
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = content.substring(start, end)
    const beforeText = content.substring(0, start)
    const afterText = content.substring(end)

    const newContent = beforeText + before + selectedText + after + afterText
    onChange(newContent)

    // Restore cursor position
    setTimeout(() => {
      textarea.focus()
      const newPosition = start + before.length + selectedText.length + after.length
      textarea.setSelectionRange(newPosition, newPosition)
    }, 0)
  }

  const formatBold = () => {
    insertText('<strong>', '</strong>')
  }

  const formatItalic = () => {
    insertText('<em>', '</em>')
  }

  const formatUnderline = () => {
    insertText('<u>', '</u>')
  }

  const formatList = () => {
    const lines = content.split('\n')
    const cursorLine = content.substring(0, textareaRef.current?.selectionStart || 0).split('\n').length - 1

    if (lines[cursorLine]?.trim().startsWith('<ul>') || lines[cursorLine]?.trim().startsWith('<li>')) {
      // Remove list formatting
      const newLines = lines.map((line, idx) => {
        if (idx === cursorLine) {
          return line.replace(/^[\s]*<li>|<\/li>[\s]*$/g, '').trim()
        }
        return line
      })
      onChange(newLines.join('\n'))
    } else {
      // Add list formatting
      const newLines = lines.map((line, idx) => {
        if (idx === cursorLine && line.trim()) {
          return `<li>${line.trim()}</li>`
        }
        return line
      })
      if (!content.includes('<ul>')) {
        onChange(`<ul>\n${newLines.join('\n')}\n</ul>`)
      } else {
        onChange(newLines.join('\n'))
      }
    }
  }

  const formatOrderedList = () => {
    const lines = content.split('\n')
    const cursorLine = content.substring(0, textareaRef.current?.selectionStart || 0).split('\n').length - 1

    if (lines[cursorLine]?.trim().startsWith('<ol>') || lines[cursorLine]?.trim().startsWith('<li>')) {
      // Remove list formatting
      const newLines = lines.map((line, idx) => {
        if (idx === cursorLine) {
          return line.replace(/^[\s]*<li>|<\/li>[\s]*$/g, '').trim()
        }
        return line
      })
      onChange(newLines.join('\n'))
    } else {
      // Add list formatting
      const newLines = lines.map((line, idx) => {
        if (idx === cursorLine && line.trim()) {
          return `<li>${line.trim()}</li>`
        }
        return line
      })
      if (!content.includes('<ol>')) {
        onChange(`<ol>\n${newLines.join('\n')}\n</ol>`)
      } else {
        onChange(newLines.join('\n'))
      }
    }
  }

  return (
    <div className="border border-gray-300 rounded-md">
      {/* Toolbar */}
      <div className="flex items-center gap-1 p-2 border-b border-gray-300 bg-white">
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={formatBold}
          title="Bold"
          disabled={disabled}
          className="text-gray-700 hover:bg-gray-100 h-8 w-8 cursor-pointer"
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={formatItalic}
          title="Italic"
          disabled={disabled}
          className="text-gray-700 hover:bg-gray-100 h-8 w-8 cursor-pointer"
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={formatUnderline}
          title="Underline"
          disabled={disabled}
          className="text-gray-700 hover:bg-gray-100 h-8 w-8 cursor-pointer"
        >
          <Underline className="h-4 w-4" />
        </Button>
        <div className="w-px h-6 bg-gray-300 mx-1" />
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={formatList}
          title="Unordered List"
          disabled={disabled}
          className="text-gray-700 hover:bg-gray-100 h-8 w-8 cursor-pointer"
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={formatOrderedList}
          title="Ordered List"
          disabled={disabled}
          className="text-gray-700 hover:bg-gray-100 h-8 w-8 cursor-pointer"
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        <div className="flex-1" />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setIsHtmlMode(!isHtmlMode)}
          disabled={disabled}
          className="text-xs text-gray-700 hover:bg-gray-100 cursor-pointer"
        >
          {isHtmlMode ? 'Preview' : 'HTML'}
        </Button>
      </div>

      {/* Editor */}
      {isHtmlMode ? (
        <div className="p-4">
          <Textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
            className="min-h-[200px] font-mono text-sm border border-gray-300 rounded-none focus:border-gray-300 focus:outline-none focus:ring-0 focus-visible:border-gray-300 focus-visible:ring-0 shadow-none"
          />
        </div>
      ) : (
        <div className="p-4">
          <Textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
            className="min-h-[200px] border border-gray-300 rounded-none focus:border-gray-300 focus:outline-none focus:ring-0 focus-visible:border-gray-300 focus-visible:ring-0 shadow-none"
          />
          {content && (
            <div className="mt-4 p-4 border-t border-gray-300">
              <p className="text-xs text-gray-500 mb-2">Preview:</p>
              <div
                className="prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
