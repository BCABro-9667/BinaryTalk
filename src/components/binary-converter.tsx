"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Check, Copy, Loader2, Wand2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { convertTextToBinaryAction } from "@/app/actions";
import { Card, CardContent } from "./ui/card";
import { Separator } from "./ui/separator";

const formSchema = z.object({
  text: z.string().min(1, {
    message: "Please enter some text to convert.",
  }),
});

export function BinaryConverter() {
  const [binaryOutput, setBinaryOutput] = React.useState<string>("");
  const [isConverting, setIsConverting] = React.useState<boolean>(false);
  const [isCopied, setIsCopied] = React.useState<boolean>(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsConverting(true);
    setBinaryOutput("");

    const result = await convertTextToBinaryAction(values);

    if (result.error) {
      toast({
        variant: "destructive",
        title: "Conversion Failed",
        description: result.error,
      });
    } else if (result.success) {
      setBinaryOutput(result.success);
    }
    
    setIsConverting(false);
  };

  const handleCopy = () => {
    if (!binaryOutput) return;
    navigator.clipboard.writeText(binaryOutput);
    setIsCopied(true);
    toast({
      title: "Copied to clipboard!",
      description: "The binary code is now on your clipboard.",
    });
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      form.handleSubmit(onSubmit)();
    }
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Your Text</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter any text here, in any language..."
                    className="min-h-[120px] resize-y text-base"
                    {...field}
                    onKeyDown={handleKeyDown}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isConverting} className="w-full sm:w-auto" size="lg">
            {isConverting ? (
              <Loader2 className="animate-spin" />
            ) : (
              <Wand2 />
            )}
            <span>{isConverting ? "Converting..." : "Convert to Binary"}</span>
          </Button>
        </form>
      </Form>

      {binaryOutput && (
        <div className="space-y-4 pt-4">
           <Separator />
            <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Binary Result</h3>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleCopy}
                        aria-label="Copy binary code to clipboard"
                        >
                        {isCopied ? <Check className="text-green-500" /> : <Copy />}
                    </Button>
                </div>
                <Card className="bg-background/50">
                    <CardContent className="p-4">
                        <pre className="font-code text-sm text-foreground whitespace-pre-wrap break-words leading-relaxed">
                          {binaryOutput}
                        </pre>
                    </CardContent>
                </Card>
            </div>
        </div>
      )}
    </div>
  );
}
