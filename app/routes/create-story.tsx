import type { Route } from "./+types/create-story";
import { requireAuth } from "~/middleware/auth";
import { StoryInputB } from "~/components/story/story-input-b";

export async function loader({ request }: Route.LoaderArgs) {
  const { headers } = await requireAuth(request);
  return Response.json({}, { headers });
}

export function meta(): Route.MetaDescriptors {
  return [
    { title: "Crea Storia" },
    { name: "description", content: "Crea una nuova storia" },
  ];
}

export default function CreateStory() {
  const handleSendText = (text: string) => {
    console.log("Text sent:", text);
  };

  const handleSendAudio = () => {
    console.log("Audio sent");
  };

  return (
    <div className="flex flex-col h-dvh bg-background">
      <main className="flex-1 flex flex-col justify-center px-4">
        <p className="text-center text-muted-foreground mb-4">
          Raccontami che storia vorresti creare
        </p>
      </main>
      <StoryInputB
        onSendText={handleSendText}
        onSendAudio={handleSendAudio}
      />
    </div>
  );
}
