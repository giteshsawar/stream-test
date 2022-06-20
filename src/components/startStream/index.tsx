import axios from 'axios'
import React, { useState } from 'react'

import './style.css'

function StartStream() {
  const [rtmpUrl, setrtmpURL] = useState<string>('')
  const [streamKey, setStreamKey] = useState<string>('')
  const [loading, setLoadingStatus] = useState<boolean>(false)

  const getInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    if (name === 'url') {
      setrtmpURL(value)
    } else {
      setStreamKey(value)
    }
  }

  const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoadingStatus(true)
    axios
      .post('http://localhost:8080/api/v1/stream/broadcast_stream', {
        rtmpUrl,
        streamKey,
      })
      .then((response) => {
        console.log('response', response)
        setLoadingStatus(false)
        alert('streaming started successfully!')
      })
      .catch((err) => {
        console.log('error', err)
        setLoadingStatus(false)
      })
  }

  const disableBtn = !rtmpUrl.length || !streamKey.length

  return (
    <div className="entry_form">
      <form onSubmit={formSubmit}>
        <div className="form_row">
          <div className="label">RTMP URL</div>
          <div className="input">
            <input
              type="text"
              value={rtmpUrl}
              placeholder="Enter RTMP url"
              onChange={getInputChange}
              name="url"
            />
          </div>
        </div>
        <div className="form_row">
          <div className="label">Stream Key</div>
          <div className="input">
            <input
              type="text"
              value={streamKey}
              placeholder="Enter stream key"
              onChange={getInputChange}
              name="key"
            />
          </div>
        </div>
        <div className="form_row">
          <button
            type="submit"
            className={disableBtn ? 'disable_btn' : ''}
            disabled={disableBtn || loading}
          >
            Start streaming
          </button>
        </div>
      </form>
    </div>
  )
}

export default StartStream
