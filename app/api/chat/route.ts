import { NextRequest, NextResponse } from 'next/server'

// n8n webhook URL (HTTP allowed server-to-server)
const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL || 'http://76.13.25.49:5678/webhook/captain-chatbot'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      throw new Error(`n8n responded with status ${response.status}`)
    }

    const data = await response.json()
    
    return NextResponse.json(data)
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { response: 'Sorry, I encountered an error. Please try again later.' },
      { status: 500 }
    )
  }
}

// Handle preflight requests
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
