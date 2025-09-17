import React from 'react';
import { BookOpen } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface NotesSectionProps {
  notes: string[];
}

const NotesSection = ({ notes }: NotesSectionProps) => {
  if (!notes || notes.length === 0) {
    return null;
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <BookOpen className="h-5 w-5 text-primary" />
          <span>Scenario Notes</span>
        </CardTitle>
        <CardDescription>
          Important information and key points for this module
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {notes.map((note, index) => (
            <div 
              key={index}
              className="p-4 bg-muted/50 rounded-lg border-l-4 border-primary/30"
            >
              <p className="text-sm leading-relaxed text-foreground">{note}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default NotesSection;