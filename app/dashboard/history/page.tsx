import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Download, Image as ImageIcon, Calendar, Clock } from 'lucide-react'
import Image from 'next/image'

// Mock data - in real app this would come from the database
const mockHistory = [
  {
    id: '1',
    originalName: 'product_photo.png',
    originalUrl: 'https://via.placeholder.com/300x200',
    processedUrl: 'https://via.placeholder.com/300x200/00ff00',
    status: 'completed',
    processingTime: 3200,
    creditsUsed: 1,
    createdAt: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
  },
  {
    id: '2',
    originalName: 'portrait.jpg',
    originalUrl: 'https://via.placeholder.com/300x200',
    processedUrl: 'https://via.placeholder.com/300x200/00ff00',
    status: 'completed',
    processingTime: 2800,
    creditsUsed: 1,
    createdAt: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
  },
  {
    id: '3',
    originalName: 'logo.png',
    originalUrl: 'https://via.placeholder.com/300x200',
    processedUrl: 'https://via.placeholder.com/300x200/00ff00',
    status: 'completed',
    processingTime: 1500,
    creditsUsed: 1,
    createdAt: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
  },
]

export default function HistoryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Processing History</h1>
        <p className="text-muted-foreground">
          View all your processed images and download them anytime.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockHistory.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg truncate">{item.originalName}</CardTitle>
                <span className="text-xs text-green-600 bg-green-100 dark:bg-green-900 px-2 py-1 rounded-full">
                  {item.status}
                </span>
              </div>
              <CardDescription className="flex items-center space-x-4 text-xs">
                <span className="flex items-center">
                  <Calendar className="w-3 h-3 mr-1" />
                  {item.createdAt.toLocaleDateString()}
                </span>
                <span className="flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {(item.processingTime / 1000).toFixed(1)}s
                </span>
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground">Original</p>
                  <div className="relative h-24 bg-muted rounded-lg overflow-hidden">
                    <Image
                      src={item.originalUrl}
                      alt="Original"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground">Processed</p>
                  <div className="relative h-24 bg-muted rounded-lg overflow-hidden">
                    <Image
                      src={item.processedUrl}
                      alt="Processed"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Credits used: {item.creditsUsed}</span>
                <Button size="sm" variant="outline">
                  <Download className="w-3 h-3 mr-1" />
                  Download
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {mockHistory.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <ImageIcon className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No processed images yet</h3>
            <p className="text-muted-foreground text-center mb-4">
              Start by uploading and processing your first image.
            </p>
            <Button asChild>
              <a href="/dashboard/upload">Upload Image</a>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}