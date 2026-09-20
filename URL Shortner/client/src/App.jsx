import React, { useEffect, useState } from "react";
import axios from "axios";
import { Copy, Link2, MousePointerClick, Send, Trash } from "lucide-react";

const App = () => {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);          // initial page load
  const [submitting, setSubmitting] = useState(false);    // create-short-url action
  const [deletingId, setDeletingId] = useState(null);     // per-item delete

  const fetchUrls = async(showLoader = false) => {
    if (showLoader) setLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/api/url");
      setUrls(response.data.data.urls);
    } catch (error) {
      console.log("Error while fetching urls", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUrls(true); 

    const onFocus = () => fetchUrls();
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
    
  }, []);

  const [currentUrl, setCurrentUrl] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [copiedId, setCopiedId] = useState(null);

  const createShortUrl = async () => {
    if (!inputValue.trim() || submitting) return;

    setSubmitting(true);
    try {
      const res = await axios.post(`http://localhost:3000/api/url`, {
        url: inputValue,
      });
      setCurrentUrl({
        originalURL: res.data.data.originalURL,
        shortCode: res.data.data.shortCode,
      });
      setInputValue("");
      await fetchUrls();
    } catch (error) {
      console.log("Error while creating short url", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const deleteUrl = async (id) => {
    if (deletingId) return;
    setDeletingId(id);
    try {
      await axios.delete(`http://localhost:3000/api/url/${id}`);
      await fetchUrls();
    } catch (error) {
      console.log("Error while deleting", error.message);
    } finally {
      setDeletingId(null);
    }
  };

  const copyToClipboard = async (shortCode, id) => {
    const shortUrl = `http://localhost:3000/${shortCode}`;
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1500);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  return (
    <main className="min-h-screen bg-black text-neutral-100 antialiased selection:bg-orange-500/30">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
        {/* Header */}
        <header className="mb-10 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-xs font-medium text-orange-400">
            <Link2 className="h-3.5 w-3.5" />
            URL Shortener
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Shorten your <span className="text-orange-500">links</span>
          </h1>
          <p className="mt-2 text-sm text-neutral-400">
            Paste a long URL and get a compact, shareable link instantly.
          </p>
        </header>

        {/* Input Bar */}
        <div className="mb-10 flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            placeholder="Paste your long URL here..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && createShortUrl()}
            disabled={submitting}
            className="flex-1 rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm text-neutral-100 placeholder-neutral-500 outline-none transition focus:border-orange-500/60 focus:ring-2 focus:ring-orange-500/20 disabled:opacity-60"
          />
          <button
            onClick={createShortUrl}
            disabled={submitting || !inputValue.trim()}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-3 text-sm font-semibold text-black transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? (
              <>
                <svg
                  className="h-4 w-4 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Shortening...
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Shorten
              </>
            )}
          </button>
        </div>

        {/* URL List */}
        <div className="space-y-4">
          {loading ? (
            /* Skeleton loader */
            <>
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="animate-pulse rounded-2xl border border-neutral-800 bg-neutral-950 p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1 space-y-3">
                      <div className="h-5 w-24 rounded bg-neutral-800" />
                      <div className="h-4 w-full rounded bg-neutral-800/70" />
                      <div className="h-6 w-20 rounded-full bg-neutral-800/70" />
                    </div>
                    <div className="flex shrink-0 gap-2">
                      <div className="h-10 w-10 rounded-lg bg-neutral-800/70" />
                      <div className="h-10 w-10 rounded-lg bg-neutral-800/70" />
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : urls.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-neutral-800 bg-neutral-950/50 py-16 text-center">
              <p className="text-sm text-neutral-500">
                No links yet. Add your first URL above.
              </p>
            </div>
          ) : (
            urls.map((url) => (
              <div
                key={url._id}
                className={`group rounded-2xl border border-neutral-800 bg-neutral-950 p-5 transition hover:border-orange-500/40 hover:bg-neutral-900/60 ${
                  deletingId === url._id ? "opacity-50" : ""
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <a
                      href={`http://localhost:3000/${url.shortCode}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-lg font-semibold text-orange-500 hover:text-orange-400"
                    >
                      /{url.shortCode}
                    </a>

                    <p
                      className="mt-1 truncate text-sm text-neutral-400"
                      title={url.originalURL}
                    >
                      {url.originalURL.length > 100
                        ? `${url.originalURL.slice(0, 100)}...`
                        : url.originalURL}
                    </p>

                    <div className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-neutral-800 bg-black px-2.5 py-1 text-xs text-neutral-400">
                      <MousePointerClick className="h-3 w-3 text-orange-500" />
                      {url.clicks} click{url.clicks === 1 ? "" : "s"}
                    </div>
                  </div>

                  <div className="flex shrink-0 gap-2">
                    <button
                      onClick={() => copyToClipboard(url.shortCode, url._id)}
                      title="Copy short URL"
                      className="rounded-lg border border-neutral-800 bg-black p-2.5 text-neutral-300 transition hover:border-orange-500/50 hover:text-orange-500"
                    >
                      <Copy className="h-4 w-4" />
                    </button>

                    <button
                      onClick={() => deleteUrl(url._id)}
                      disabled={deletingId === url._id}
                      title="Delete"
                      className="rounded-lg border border-neutral-800 bg-black p-2.5 text-neutral-300 transition hover:border-red-500/50 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {deletingId === url._id ? (
                        <svg
                          className="h-4 w-4 animate-spin"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          />
                        </svg>
                      ) : (
                        <Trash className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {copiedId === url._id && (
                  <p className="mt-3 text-xs font-medium text-orange-500">
                    ✓ Copied to clipboard
                  </p>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
};

export default App;