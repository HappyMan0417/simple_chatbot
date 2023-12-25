import React, { useEffect, useRef, useState } from "react";
import "./chatbot.css";
import axios from "axios";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";
import Textarea from "react-textarea-autosize";
import { useEnterSubmit } from "../../components/ui/use-Enter";
import { ChatMessageActions } from "../../components/ui/reactAction";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const endOfChat = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isChat, setIsChat] = useState(false);
  const [value, setValue] = useState("");

  const scrollToBottom = () => {
    endOfChat.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const botReply = (question) => {
    setIsChat(true);
    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/query`,
        { query: question },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
        setIsLoading(false);
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: response.data.message, sender: "bot" },
        ]);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Error:", error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const messageContent = event.target.elements.message.value;

    setMessages((prevMessages) => [
      ...prevMessages,
      { text: messageContent, sender: "user" },
    ]);
    botReply(messageContent);
    event.target.reset();
    setValue("");
  };

  const send = (messageContent) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: messageContent, sender: "user" },
    ]);
    botReply(messageContent);
  };
  const inputRef = useRef(null);

  const { formRef, onKeyDown } = useEnterSubmit();
  return (
    <div className="flex justify-center items-center h-full p-5">
      <div className="flex flex-col  w-[100%] sm:w-[80%] md:w-[70%] bg-white p-3  h-full">
        <div id={"qa_box"} className="px-2 py-3 ">
          {messages.length === 0 ? (
            <div className="rounded-lg border bg-background p-8">
              <h1 className="mb-2 text-lg font-semibold">
                Welcome to the Sales Chatbot!
              </h1>
              <p className="mb-2 leading-normal text-muted-foreground">
                The ultimate sales assistant .
              </p>
              <p className="leading-normal text-muted-foreground">
                You can start a conversation here or try the following examples:
              </p>
              <div className="mt-4 flex flex-col items-start space-y-2">
                <button
                  className="inline-flex items-center justify-center rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary underline-offset-4 shadow-none hover:underline h-auto p-0 text-base"
                  onClick={() => {
                    setValue("Find an email");
                    send("Find an email");
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 256 256"
                    fill="currentColor"
                    className="h-4 w-4 mr-2 text-muted-foreground"
                  >
                    <path d="m221.66 133.66-72 72a8 8 0 0 1-11.32-11.32L196.69 136H40a8 8 0 0 1 0-16h156.69l-58.35-58.34a8 8 0 0 1 11.32-11.32l72 72a8 8 0 0 1 0 11.32Z"></path>
                  </svg>
                  Find an email
                </button>
                <button
                  className="inline-flex items-center justify-center rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary underline-offset-4 shadow-none hover:underline h-auto p-0 text-base"
                  onClick={() => {
                    setValue("Write a sales email");
                    send("Write a sales email");
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 256 256"
                    fill="currentColor"
                    className="h-4 w-4 mr-2 text-muted-foreground"
                  >
                    <path d="m221.66 133.66-72 72a8 8 0 0 1-11.32-11.32L196.69 136H40a8 8 0 0 1 0-16h156.69l-58.35-58.34a8 8 0 0 1 11.32-11.32l72 72a8 8 0 0 1 0 11.32Z"></path>
                  </svg>
                  Write a sales email
                </button>
                <button
                  className="inline-flex items-center justify-center rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary underline-offset-4 shadow-none hover:underline h-auto p-0 text-base"
                  onClick={() => {
                    setValue("What's the best way to create a sales campaign");
                    send("What's the best way to create a sales campaign");
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 256 256"
                    fill="currentColor"
                    className="h-4 w-4 mr-2 text-muted-foreground"
                  >
                    <path d="m221.66 133.66-72 72a8 8 0 0 1-11.32-11.32L196.69 136H40a8 8 0 0 1 0-16h156.69l-58.35-58.34a8 8 0 0 1 11.32-11.32l72 72a8 8 0 0 1 0 11.32Z"></path>
                  </svg>
                  What's the best way to create a sales campaign
                </button>
              </div>
            </div>
          ) : (
            ""
          )}

          {messages.map((msg, index) => (
            <div key={index} className="my-4 ml-4 mr-4">
              {msg.sender === "user" ? (
                <div className="group relative mb-4 flex items-start">
                  <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border shadow bg-background">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 256 256"
                      fill="currentColor"
                      className="h-4 w-4"
                    >
                      <path d="M230.92 212c-15.23-26.33-38.7-45.21-66.09-54.16a72 72 0 1 0-73.66 0c-27.39 8.94-50.86 27.82-66.09 54.16a8 8 0 1 0 13.85 8c18.84-32.56 52.14-52 89.07-52s70.23 19.44 89.07 52a8 8 0 1 0 13.85-8ZM72 96a56 56 0 1 1 56 56 56.06 56.06 0 0 1-56-56Z"></path>
                    </svg>
                  </div>
                  <div className="ml-4 flex-1 space-y-2 overflow-hidden px-1">
                    <div className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0">
                      <p className="mb-2 last:mb-0">{msg.text}</p>
                    </div>
                    <ChatMessageActions message={msg} />
                  </div>
                </div>
              ) : (
                <div className="group relative mb-4 flex items-start">
                  <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border shadow bg-primary text-primary-foreground">
                    <svg
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                    >
                      <title>OpenAI icon</title>
                      <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"></path>
                    </svg>
                  </div>
                  <div className="ml-4 flex-1 space-y-2 overflow-hidden px-1">
                    <div className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0">
                      <p className="mb-2 last:mb-0">{msg.text}</p>
                    </div>
                    <ChatMessageActions message={msg} />
                  </div>
                </div>
              )}
              <div
                data-orientation="horizontal"
                role="none"
                className="shrink-0 bg-border h-[1px] w-full my-4 md:my-8 bg-[#dedede]"
              ></div>
            </div>
          ))}

          <div ref={endOfChat}></div>
        </div>
        <div className="mt-auto flex justify-center">
          <form
            onSubmit={handleSubmit}
            className="px-4 pb-2  w-[100%] md:w-[70%] sm:w-[80%]"
            ref={formRef}
          >
            <div className="relative flex max-h-60 w-full grow flex-col overflow-hidden bg-background px-8 sm:rounded-md sm:border sm:px-12">
              <Textarea
                ref={inputRef}
                tabIndex={0}
                onKeyDown={onKeyDown}
                name="message"
                rows={1}
                placeholder="Send a message."
                spellCheck={false}
                onChange={(e) => setValue(e.target.value)}
                value={value}
                className="min-h-[60px] w-full resize-none bg-transparent px-4 py-[1.3rem] focus-within:outline-none sm:text-sm"
              />
              <div className="absolute right-0 top-4 sm:right-4">
                <button
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow-md hover:bg-primary/90 h-8 w-8 p-0"
                  type="submit"
                  data-state="closed"
                  disabled=""
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 256 256"
                    fill="currentColor"
                    className="h-4 w-4"
                  >
                    <path d="M200 32v144a8 8 0 0 1-8 8H67.31l34.35 34.34a8 8 0 0 1-11.32 11.32l-48-48a8 8 0 0 1 0-11.32l48-48a8 8 0 0 1 11.32 11.32L67.31 168H184V32a8 8 0 0 1 16 0Z"></path>
                  </svg>
                  <span className="sr-only">Send message</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
