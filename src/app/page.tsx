import { BinaryConverter } from '@/components/binary-converter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Binary } from 'lucide-react';

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4 sm:p-6 md:p-8">
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[url('data:image/svg+xml,%3csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%2080%2040%22%20width=%2280%22%20height=%2240%22%3e%3ctext%20fill=%22%232d2d2d%22%20x=%220%22%20y=%2215%22%3e01010101010101010101%3c/text%3e%3ctext%20fill=%22%232d2d2d%22%20x=%220%22%20y=%2235%22%3e10101010101010101010%3c/text%3e%3c/svg%3e')] bg-repeat"></div>
      <Card className="w-full max-w-2xl shadow-2xl shadow-primary/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-3xl font-headline sm:text-4xl">
            <Binary className="h-8 w-8 text-primary" />
            BinaryTalk
          </CardTitle>
          <CardDescription className="pt-2 text-base">
            Convert text from any language into its binary representation instantly.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <BinaryConverter />
        </CardContent>
      </Card>
       <footer className="mt-8 text-center text-sm text-muted-foreground">
        <p>Built with Next.js and Firebase Genkit.</p>
      </footer>
    </main>
  );
}
