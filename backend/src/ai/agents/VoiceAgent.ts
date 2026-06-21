import { BaseAgent, AgentResponse } from '../types/agent';
import { PromptEngine } from '../core/PromptEngine';
import { AgentContext } from '../types';

export interface AudioInput {
  audioBuffer: Buffer;
  mimeType: string;
}

export class VoiceAgent implements BaseAgent {
  constructor(private promptEngine: PromptEngine) {}

  public async process(input: AudioInput, context: AgentContext): Promise<AgentResponse> {
    // Generate context prompt
    const systemPrompt = this.promptEngine.generateSystemPrompt('voice_agent', context);

    // TODO:
    // 1. Call Speech-to-Text API (e.g., Whisper) to transcribe the audio.
    // 2. Potentially pre-process the transcribed text.
    // 3. Return the transcribed text so it can be passed to the IntentParser.

    console.log('VoiceAgent processing audio buffer. Length:', input.audioBuffer.length);

    // Mock transcription
    const mockedTranscription = 'Vendí dos cocacolas grandes';

    return {
      success: true,
      message: 'Audio transcribed successfully',
      data: {
        transcription: mockedTranscription
      }
    };
  }
}
