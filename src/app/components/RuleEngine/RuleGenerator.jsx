import React, { useState, useRef } from 'react';
import { TextField, Popper, Paper, MenuList, MenuItem } from '@mui/material';

const RuleGenerator = () => {
  // State for the rule string
  const [ruleText, setRuleText] = useState('');
  // State for the Popper (dropdown)
  const [popperOpen, setPopperOpen] = useState(false);
  const [popperAnchor, setPopperAnchor] = useState(null);
  const [options, setOptions] = useState([]);
  const [optionType, setOptionType] = useState(''); // 'data' or 'keywords'
  // Ref to access the underlying input element
  const inputRef = useRef(null);

  // Predefined options (these could come from props or an API)
  const dataOptions = ['user.name', 'user.age', 'order.total'];
  const keywordOptions = ['equals', 'contains', 'greater than'];

  // Handle text input changes
  const handleTextChange = (event) => {
    const newValue = event.target.value;
    setRuleText(newValue);

    // Get cursor position and the character just typed
    const cursorPosition = inputRef.current.selectionStart;
    const charBeforeCursor = newValue[cursorPosition - 1];

    // Show Popper based on trigger character
    if (charBeforeCursor === '[') {
      setOptionType('data');
      setOptions(dataOptions);
      setPopperAnchor(inputRef.current);
      setPopperOpen(true);
    } else if (charBeforeCursor === '{') {
      setOptionType('keywords');
      setOptions(keywordOptions);
      setPopperAnchor(inputRef.current);
      setPopperOpen(true);
    } else {
      setPopperOpen(false); // Close if no trigger or typing continues
    }
  };

  // Handle option selection from the Popper
  const handleOptionSelect = (option) => {
    const cursorPosition = inputRef.current.selectionStart;
    // Format the inserted text with brackets
    const insertedText = optionType === 'data' ? `[${option}]` : `{${option}}`;
    // Replace the trigger character with the selected option
    const newText =
      ruleText.slice(0, cursorPosition - 1) +
      insertedText +
      ruleText.slice(cursorPosition);
    setRuleText(newText);
    setPopperOpen(false);

    // Move cursor after the inserted text
    const newCursorPosition = cursorPosition - 1 + insertedText.length;
    setTimeout(() => {
      inputRef.current.focus();
      inputRef.current.setSelectionRange(newCursorPosition, newCursorPosition);
    }, 0);
  };

  // Handle key presses (e.g., Escape to close Popper)
  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      setPopperOpen(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <TextField
        label="Type your rule here (use [ for data, { for keywords)"
        multiline
        rows={4}
        value={ruleText}
        onChange={handleTextChange}
        onKeyDown={handleKeyDown}
        inputRef={inputRef}
        fullWidth
        variant="outlined"
      />
      <Popper
        open={popperOpen}
        anchorEl={popperAnchor}
        placement="bottom-start"
        sx={{ zIndex: 1300 }} // Ensure it appears above other elements
      >
        <Paper elevation={3}>
          <MenuList>
            {options.map((option) => (
              <MenuItem
                key={option}
                onClick={() => handleOptionSelect(option)}
                sx={{ minWidth: '150px' }}
              >
                {option}
              </MenuItem>
            ))}
          </MenuList>
        </Paper>
      </Popper>
    </div>
  );
}

export default RuleGenerator;