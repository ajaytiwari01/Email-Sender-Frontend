import React from "react";
import toast from "react-hot-toast";
import { sendEmail } from "../Services/emailservice";
import { Editor } from "@tinymce/tinymce-react";




export default function EmailSender() {
  let [emailData, setEmailData] = React.useState({
    to: "",
    subject: "",
    body: "",
  });

  let [sending, setSending] = React.useState(false);

  const editorRef = React.useRef(null);

  async function handleInputChange(event) {
    setEmailData((currData) => {
      return { ...currData, [event.target.name]: event.target.value };
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (emailData.to == "" || emailData.subject == "" || emailData.body == "") {
      toast.error("Please fill all the fields");
      return;
    }

    try {
      setSending(true);
      await sendEmail(emailData);
      toast.success("Email Sent Successfully");
      toast.success("Check your inbox/spam for the email");
      console.log(emailData);

      editorRef.current.setContent("");
      setEmailData({
        to: "",
        subject: "",
        body: "",
      });
    } catch (error) {
      console.log(error);
      toast.error("Error in sending email");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="min-w-full  min-h-screen flex justify-center items-center dark:bg-gray-900">
      <div
        className="email_card md:w-1/2 w-full mx-4 md:mx-0 -mt-12 p-6 rounded-2xl 
                border border-gray-200 shadow-lg bg-gradient-to-br from-white via-gray-50 to-gray-100 
                dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 
                dark:border-gray-700 dark:text-white  font-bold
                transition-transform duration-300 hover:scale-[1.01] hover:shadow-2xl"
      >
        <h1 className=" text-grey-900  dark:text-gray-200 text-3xl flex justify-center items-center">
          Email Sender
        </h1>
        <p className="text-grey-500  dark: text-gray-300 flex justify-center items-center mb-2">
          Send Email to your closeones with your own Application
        </p>
        <form action="" onSubmit={handleSubmit}>
          <div class="input_field">
            <label
              htmlFor="email"
              class="block text-sm font-medium text-gray-900 dark:text-dark mb-2"
            >
              {" "}
              To{" "}
            </label>
            <input
              type="email"
              id="email"
              name="to"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="To whom you want to send the mail"
              onChange={handleInputChange}
              value={emailData.to}
            />

            <label
              htmlFor="subject"
              class="block text-sm font-medium text-gray-900 dark:text-dark mb-2 mt-2"
            >
              {" "}
              Subject{" "}
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder=" Enter Subject"
              onChange={handleInputChange}
              value={emailData.subject}
            />

            <label
              for="message"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-2"
            >
              Message
            </label>
            {/* <textarea id="message" rows="8" name='body' class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Type Your message" onChange={handleInputChange}
            value={emailData.body}></textarea> */}

            {/* <div className='mt-2 mb-2' style={{height:200}}> */}
            <Editor
              onEditorChange={(event) => {
                setEmailData({
                  ...emailData,
                  body: editorRef.current.getContent(),
                });
              }}
              onInit={(evt, editor) => {
                editorRef.current = editor;
              }}
              apiKey={import.meta.env.VITE_SECRET1}
              init={{
                // 👈 minimum writing area
                height: 300, // 👈 default writing area
                menubar: false,
                plugins: [
                  // Core editing features
                  "anchor",
                  "autolink",
                  "charmap",
                  "codesample",
                  "emoticons",
                  "link",
                  "lists",
                  "media",
                  "searchreplace",
                  "table",
                  "visualblocks",
                  "wordcount",
                  // Your account includes a free trial of TinyMCE premium features
                  // Try the most popular premium features until Oct 18, 2025:
                  "checklist",
                  "mediaembed",
                  "casechange",
                  "formatpainter",
                  "pageembed",
                  "a11ychecker",
                  "tinymcespellchecker",
                  "permanentpen",
                  "powerpaste",
                  "advtable",
                  "advcode",
                  "advtemplate",
                  "ai",
                  "uploadcare",
                  "mentions",
                  "tinycomments",
                  "tableofcontents",
                  "footnotes",
                  "mergetags",
                  "autocorrect",
                  "typography",
                  "inlinecss",
                  "markdown",
                  "importword",
                  "exportword",
                  "exportpdf",
                ],
                toolbar:
                  "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography uploadcare | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
                tinycomments_mode: "embedded",
                tinycomments_author: "Author name",
                mergetags_list: [
                  { value: "First.Name", title: "First Name" },
                  { value: "Email", title: "Email" },
                ],
                ai_request: (request, respondWith) =>
                  respondWith.string(() =>
                    Promise.reject("See docs to implement AI Assistant")
                  ),
                uploadcare_public_key: import.meta.env.VITE_SECRET1,
              }}
              initialValue="Welcome to TinyMCE!"
            />

            {sending && (
              <div className=" loader  flex-col flex gap-2 justify-center items-center mt-2 ">
                <div role="status">
                  <svg
                    aria-hidden="true"
                    class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span class="sr-only">Loading...</span>
                </div>

                <h1>Sending Email...</h1>
              </div>
            )}

            <div className="button_container  flex justify-center mt-0.5 mb-1 gap-3">
              <button
                type="submit"
                disabled={sending}
                className="bg-blue-600 text-white font-semibold px-6 py-2.5 rounded-xl 
             shadow-md hover:bg-blue-700 hover:shadow-lg 
             transition duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send Email
              </button>

              {/* Clear Button */}
              <button
                type="reset"
                className="bg-gray-500 text-white font-semibold px-6 py-2.5 rounded-xl 
             shadow-md hover:bg-gray-600 hover:shadow-lg 
             transition duration-300 transform hover:-translate-y-0.5"
              >
                Clear
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
