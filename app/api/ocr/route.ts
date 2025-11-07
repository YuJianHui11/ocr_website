import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { image } = await request.json()

    if (!image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 })
    }

    const apiKey = process.env.SILICONFLOW_API_KEY
    const apiUrl = process.env.SILICONFLOW_API_URL || "https://api.siliconflow.cn/v1/chat/completions"

    if (!apiKey) {
      return NextResponse.json({ error: "API key not configured" }, { status: 500 })
    }

    // Call SiliconFlow API
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "deepseek-ai/DeepSeek-OCR",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "image_url",
                image_url: {
                  url: image,
                  detail: "auto",
                },
              },
            ],
          },
        ],
        stream: false,
        max_tokens: 4096,
        temperature: 0.7,
        top_p: 0.7,
        top_k: 50,
        frequency_penalty: 0.5,
        n: 1,
        response_format: {
          type: "text",
        },
      }),
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error("SiliconFlow API error:", errorData)
      return NextResponse.json(
        { error: `API request failed: ${response.statusText}` },
        { status: response.status }
      )
    }

    const data = await response.json()

    // Extract text from the response
    const extractedText = data.choices?.[0]?.message?.content || ""

    return NextResponse.json({ text: extractedText })
  } catch (error) {
    console.error("OCR API error:", error)
    return NextResponse.json({ error: "Failed to process image" }, { status: 500 })
  }
}
