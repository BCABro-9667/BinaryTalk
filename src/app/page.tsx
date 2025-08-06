import { BinaryConverter } from '@/components/binary-converter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Binary } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-center bg-background p-4 sm:p-6 md:p-8">
      <Image
        src="https://img.freepik.com/free-vector/white-digital-matrix-binary-code-numbers-background_1017-25332.jpg"
        alt="Binary code background"
        layout="fill"
        objectFit="cover"
        className="-z-10"
        data-ai-hint="binary code"
      />
      <Card className="w-full max-w-2xl bg-white/30 backdrop-blur-sm shadow-2xl shadow-primary/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-3xl font-headline sm:text-4xl">
            <Binary className="h-8 w-8 text-primary" />
            BinaryTalk
          </CardTitle>
          <CardDescription className="pt-2 text-base text-foreground/80">
            Convert text from any language into its binary representation instantly.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <BinaryConverter />
        </CardContent>
      </Card>
      <footer className="mt-8 text-center text-sm text-white/80">
        <p>Made with ❤️ by Avdhesh Kumar</p>
      </footer>
    </main>
  );
}
