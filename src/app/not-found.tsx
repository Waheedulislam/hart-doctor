import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Eye } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground">
              Welcome to Our Site
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              This is a demo homepage showcasing our beautifully designed 404
              error page.
            </p>
          </div>

          {/* Demo Cards */}
          <div className="grid md:grid-cols-2 gap-6 mt-12">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-primary" />
                  View 404 Page
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Check out our custom-designed 404 error page with engaging
                  visuals and helpful navigation.
                </p>
                <Button
                  asChild
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  <Link href="/">Home Page</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-accent" />
                  Design Features
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <ul className="text-left space-y-2 text-muted-foreground">
                  <li>• Warm amber and blue color scheme</li>
                  <li>• Engaging hero illustration</li>
                  <li>• Clear navigation options</li>
                  <li>• Helpful links to popular sections</li>
                  <li>• Dark mode support</li>
                  <li>• Fully accessible design</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Navigation Links */}
          <div className="pt-8">
            <p className="text-muted-foreground mb-4">
              Try these navigation examples:
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="outline" asChild>
                <Link href="/about">About</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/blog">Blog</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/contact">Contact</Link>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              (These links will show the 404 page since they don&#39;t exist
              yet)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
