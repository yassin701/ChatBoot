import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { query, sessionId } = body;

    if (!query) {
      return NextResponse.json({ error: 'Query is missing' }, { status: 400 });
    }

    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;
    if (!n8nWebhookUrl) {
      return NextResponse.json({ error: 'N8N Webhook URL not configured' }, { status: 500 });
    }

    console.log(`[API Proxy] Forwarding to ${n8nWebhookUrl}`);
    console.log(`[API Proxy] Payload:`, { query, sessionId });

    const n8nResponse = await fetch(n8nWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, sessionId }),
    });

    if (!n8nResponse.ok) {
      return NextResponse.json({ error: 'Failed to communicate with the n8n backend' }, { status: n8nResponse.status });
    }

    const data = await n8nResponse.json();
    
    // We expect the n8n workflow to return {"output": "..."} based on our earlier architecture choice.
    return NextResponse.json({ output: data.output || "Success, but no specific text was outputted by the Agent." }, { status: 200 });

  } catch (error) {
    console.error('API Route Error:', error);
    return NextResponse.json({ error: 'Internal server error while reaching n8n' }, { status: 500 });
  }
}
