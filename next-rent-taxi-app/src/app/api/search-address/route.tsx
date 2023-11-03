import React from 'react'
import { NextResponse } from 'next/server'

const BASE_URL = 'https://api.mapbox.com/search/searchbox/v1/suggest'
export const GET = async (request: any) => {
    const { searchParams } = new URL(request.url)
    const searchText = searchParams.get('input')
    const res = await fetch(`${BASE_URL}?input=${searchText}?language=en&limit=6&session_token=5ccce4a4-ab0a-4a7c-943d-580e55542363&country=IN&access_token=${process.env.MAPBOX_ACCESS_TOKEN}`, {
        headers: {
            'Content-Type': "application/json"
        }
    })
    console.log("res",`${BASE_URL}?input=${searchText}?language=en&limit=6&session_token=5ccce4a4-ab0a-4a7c-943d-580e55542363&country=US&access_token=${process.env.MAPBOX_ACCESS_TOKEN}`)
    const result = await res.json()
    return NextResponse.json(result)
}

