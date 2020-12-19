import { useState } from 'react';
import { useMutation } from '@apollo/client';
import {
  SEND_PRIVATE_MSG,
  SEND_GROUP_MSG,
  SEND_GLOBAL_MSG,
} from '../../graphql/mutations';
import { useStateContext } from '../../context/state';
import EmojiPicker from '../../components/EmojiPicker';

import {
  Button,
  TextField,
  IconButton,
  InputAdornment,
} from '@material-ui/core';
import { useConversationPageStyles } from '../../styles/muiStyles';
import SendIcon from '@material-ui/icons/Send';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';

const SendMessage = () => {
  const classes = useConversationPageStyles();
  const { selectedChat } = useStateContext();
  const [messageBody, setMessageBody] = useState('');
  const [emojiAnchorEl, setEmojiAnchorEl] = useState(null);

  const [submitPrivateMsg, { loading: loadingPrivate }] = useMutation(
    SEND_PRIVATE_MSG,
    {
      onError: (err) => {
        console.log(err);
      },
    }
  );
  const [submitGroupMsg, { loading: loadingGroup }] = useMutation(
    SEND_GROUP_MSG,
    {
      onError: (err) => {
        console.log(err);
      },
    }
  );
  const [submitGlobalMsg, { loading: loadingGlobal }] = useMutation(
    SEND_GLOBAL_MSG,
    {
      onError: (err) => {
        console.log(err);
      },
    }
  );

  const clearInput = () => {
    setMessageBody('');
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (messageBody.trim() === '' || !selectedChat) return;

    if (selectedChat.chatType === 'private') {
      submitPrivateMsg({
        variables: { receiverId: selectedChat.chatData.id, body: messageBody },
        update: () => {
          clearInput();
        },
      });
    } else if (selectedChat.chatType === 'group') {
      submitGroupMsg({
        variables: {
          conversationId: selectedChat.chatData.id,
          body: messageBody,
        },
        update: () => {
          clearInput();
        },
      });
    } else {
      submitGlobalMsg({
        variables: { body: messageBody },
        update: () => {
          clearInput();
        },
      });
    }
  };

  const handleEmojiAdd = (emoji) => {
    setMessageBody((prevString) => prevString.concat(emoji));
  };

  return (
    <form className={classes.sendMsgForm} onSubmit={handleSendMessage}>
      <TextField
        value={messageBody}
        fullWidth
        type="text"
        placeholder="Type a message..."
        variant="outlined"
        onChange={(e) => setMessageBody(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                size="small"
                color="primary"
                onClick={(e) => setEmojiAnchorEl(e.currentTarget)}
              >
                <InsertEmoticonIcon fontSize="large" />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <EmojiPicker
        anchorEl={emojiAnchorEl}
        setAnchorEl={setEmojiAnchorEl}
        handleEmojiAdd={handleEmojiAdd}
      />
      <Button
        size="small"
        color="primary"
        variant="contained"
        type="submit"
        disabled={loadingPrivate || loadingGroup || loadingGlobal}
      >
        <SendIcon />
      </Button>
    </form>
  );
};

export default SendMessage;
