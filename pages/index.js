import { Client } from "@notionhq/client"
import { useState } from "react"
import Image from 'next/image'
import notion_logo from '../public/download.png'
import twitter_logo from '../public/twitter.png'
import noteury_logo from '../public/noteury.png'



export default function Home() {

  const [ tweet, setTweet ] = useState('')
  const [ google_doc_title, setGoogleDocTitle ] = useState('')
  const [ photoSearchTerm, setPhotoSearchTerm ] = useState('')
  const [ photos, setPhotos ] = useState('')
  const [ tweetContent, setTweetContent ] = useState()

  async function searchPhotos() {
    const data = await fetch(`https://api.unsplash.com/search/photos/query=${photoSearchTerm}&orientation=landscape`)
    const photos = await data.json()
    setPhotos(photos.results)
    console.log(photos)
  }

  var myHeaders = new Headers();
myHeaders.append("Authorization", "OAuth oauth_consumer_key=\"C0M0sb2QlWjFUB8bPx9sobi8o\",oauth_token=\"1218522774379147264-DY0qYN2Sl5KpvP2DqCPITYM8R4WPvU\",oauth_signature_method=\"HMAC-SHA1\",oauth_timestamp=\"1664643506\",oauth_nonce=\"AyoQTewmhrV\",oauth_version=\"1.0\",oauth_signature=\"F%2FWW0xDOWhM4xqLpajBj8Iy2t8g%3D\"");
myHeaders.append("Content-Type", "application/json")

var raw = JSON.stringify({
  "text": "Hello World... I mean Twitter!"
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("https://api.twitter.com/2/tweets", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));


  
const notion = new Client({ auth: process.env.NOTION_API_KEY });

/*
(async () => {
  try {
  const pageId = 'cb11f779dc0f404e9aa2e188cc946a45';
  const response = await notion.pages.retrieve({ page_id: pageId });
  console.log(response);
  } catch (err) {
    console.log(err)
  }
})();
*/

const updatePage = async () => {
  const pageId = "adc1aa64-dec6-4bda-aab9-47aaa0ab2bb0"
  const response = await notion.pages.update({
    page_id: pageId,
    properties: {
      'Tags': {
        "multi_select" : [
          {
            "name": "Science"
          }
        ]
      },
      'Status': {
        "status": {
          "name": tweet
        }
      }
    },
  });
  console.log(response);
}

(async () => {
  try {
  const blockId = 'cb11f779-dc0f-404e-9aa2-e188cc946a45'
  const response = await notion.blocks.children.list({
    block_id: blockId
  })
  console.log(response.results[1].paragraph.rich_text[0].plain_text)
  setTweetContent(response.results[1])
  console.log(tweetContent)
  } catch (err) {
    console.error(err)
  }
})()


const databaseId = process.env.NOTION_DATABASE_ID



const draftTweet = async () => {
  const response = await notion.pages.create({
    "parent": {
      "type": "database_id",
      "database_id": databaseId
    },
    "properties": {
      "Tweets": {
        "title": [
          {
            "text": {
              "content": "New Tweet"
            }
          }
        ]
      },
      "Status": {
        "status": {
          "name": "Drafted"
        }
      }
    },
    "icon": {
      "type": "emoji",
      "emoji": "🐤"
    },
    "children": [
      {
        "object": "block",
        "heading_1": {
          "rich_text": [{"text": {"content": "Tweet"}}]
        }
      },
      {
        "object": "block",
        "paragraph": {
          "rich_text": [{"text": {"content": tweet}}]
        }
      }
    ]
  })
  console.log(response)
}

/*
(async () => {
  try {
  const response = await notion.databases.query({
    database_id: databaseId
    
  });
  setTweets(response.results[0].length)
  console.log(response.results[0])
} catch (err) {
  console.error(err)
}
})();
*/


  return (
    <div className="grid grid-cols-3 gap-4">
    <div className="bg-blue-100 absolute h-full w-full flex flex-col items-center justify-center">
      <Image
        src={noteury_logo}
        alt="Noteury Logo"
        height={100}
        width={100}
      />
      <h1 className="text-blue-800 font-Bakbak mt-5 font-bold text-3xl">Post to Twitter with Noteury</h1>
      <textarea type="text" rows="6" maxLength="280" placeholder="What's happening?" onChange={e => setTweet(e.target.value)} value={tweet} className="rounded-xl underline-none text-xl text-blue-700 font-bold w-1/4 px-3 py-2 border-blue-400 border-2 mt-8" />
      <div className="flex flex-row items-center mt-5">
      <div className="bg-green-400 mr-3 rounded-full h-4 w-4">
        <div className="animate-ping opacity-90 bg-green-300 h-full w-full p-2 rounded-full"></div>
      </div>
      <p className="text-green-600 font-semibold text-lg">You have 3 drafted tweets</p>
      </div>
      <div className="flex flex-col items-center mt-5 justify-center">
        <button type="button" onClick={draftTweet} className="bg-blue-600 focus:ring-2 mt-3 focus:ring-offset-2 focus:ring-blue-400 flex flex-row items-center hover:bg-blue-700 text-gray-50 font-bold rounded-xl px-3 py-2 shadow-lg">
          <span className="mr-2">Post to Twitter</span>
          <Image
            src={twitter_logo}
            alt="Twitter logo"
            height={30}
            width={30} 
          />
        </button>
        <span className="text-xl mt-3">or</span>
        <button type="button" className="mt-3 bg-gray-800 focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 hover:bg-gray-900 flex flex-row items-center text-gray-100 font-bold rounded-xl px-3 py-2 shadow-lg">
          <span className="mr-2">Get tweet from Notion</span>
          <Image
            src={notion_logo}
            alt="Notion Logo"
            height={30}
            width={30} 
            className="rounded-full"
          />
        </button>
      </div>
      <p className="mt-5 font-Poppins">You want to draft a tweet for later? You can do it <span className="font-bold underline">right here.</span></p>
      <p className=" text-lg mt-8 font-semibold">Built with 💙 by @TheAmineAouragh</p>
    </div>
    <div className="bg-gray-600 h-full">j</div>
    </div>
  )
}
