'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
//import { toast } from '@/components/ui/use-toast'
import { FileUp, FileText, Loader2 } from 'lucide-react'
import { toast } from '@/hooks/use-toast'

interface PDFUploaderProps {
  onUpload: (content: string) => void
}

export default function PDFUploader({ onUpload }: PDFUploaderProps) {
  const [file, setFile] = useState<File | null>(null)
  const [summary, setSummary] = useState<string>('')
  const [isUploading, setIsUploading] = useState(false)
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return

    setIsUploading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('/api/upload-pdf', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()
        onUpload(data.content)
        toast({
          title: "Success",
          description: "PDF uploaded and processed successfully!",
        })
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to upload PDF')
      }
    } catch (error) {
      console.error('Error uploading PDF:', error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An error occurred while uploading the PDF",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  const generateSummary = async () => {
    if (!file) return

    setIsGeneratingSummary(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('/api/generate-summary', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to generate summary')
      }

      const data = await response.json()
      setSummary(data.summary)
      toast({
        title: "Success",
        description: "Summary generated successfully!",
      })
    } catch (error) {
      console.error('Error generating summary:', error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An error occurred while generating the summary",
        variant: "destructive",
      })
    } finally {
      setIsGeneratingSummary(false)
    }
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl">
          <FileUp className="mr-2 text-primary" />
          Upload PDF
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleUpload} className="space-y-4">
          <div className="flex items-center justify-center w-full">
            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <FileText className="w-10 h-10 mb-3 text-gray-400" />
                <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                <p className="text-xs text-gray-500">PDF (MAX. 10MB)</p>
              </div>
              <Input id="dropzone-file" type="file" accept=".pdf" className="hidden" onChange={handleFileChange} required />
            </label>
          </div>
          {file && <p className="text-sm text-muted-foreground">Selected file: {file.name}</p>}
          <div className="flex space-x-2">
            <Button type="submit" disabled={!file || isUploading} className="flex-1">
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                'Upload PDF'
              )}
            </Button>
            <Button onClick={generateSummary} disabled={!file || isGeneratingSummary} variant="outline" className="flex-1">
              {isGeneratingSummary ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                'Generate Summary'
              )}
            </Button>
          </div>
        </form>
        {summary && (
          <div className="mt-6 p-4 bg-muted rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Summary:</h3>
            <p className="text-sm text-muted-foreground">{summary}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

