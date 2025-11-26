"use client"

import { useState } from "react"

export function useInput(initialValue = "") {
  const [value, setValue] = useState(initialValue)

  const handleChange = (e) => {
    setValue(e.target.value)
  }

  const reset = () => {
    setValue(initialValue)
  }

  return {
    value,
    onChange: handleChange,
    reset,
    bind: {
      value,
      onChange: handleChange,
    },
  }
}
