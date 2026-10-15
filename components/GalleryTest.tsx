// "use client";

// import { useCallback, useEffect, useRef, useState } from "react";
// import Image from "next/image";
// import { FaXmark, FaChevronLeft, FaChevronRight } from "react-icons/fa6";

// export type GalleryItem = {
//   id: string;
//   caption?: string;
//   src?: string; //omit for gradient
//   width: number;
//   height: number;
// };

// function Media({
//   item,
//   sizes,
//   className,
// }: {
//   item: GalleryItem;
//   sizes: string;
//   className: string;
// }) {
//   if (item.src) {
//     return (
//       <Image
//         src={item.src}
//         alt={item.caption ?? ""}
//         width={item.width}
//         height={item.height}
//         sizes={sizes}
//         className={className}
//       />
//     );
//   }
//   return (
//     <div
//       className={`bg-linear-to-br from-bloom/40 via-plum/30 to-iris/40 ${className}`}
//       style={{ aspectRatio: `${item.width} / ${item.height}` }}
//     />
//   );
// }

// export default function GalleryGrid({ items }: { items: GalleryItem[] }) {
//   const [active, setActive] = useState<number | null>(null);
//   const dialogRef = useRef<HTMLDialogElement>(null);
//   const isOpen = active !== null;

//   const open = (i: number) => {
//     setActive(i);
//     dialogRef.current?.showModal();
//   };

//   const close = () => dialogRef.current?.close();

//   const go = useCallback(
//     (dir: 1 | -1) =>
//       setActive((i) =>
//         i === null ? i : (i + dir + items.length) % items.length,
//       ),
//     [items.length],
//   );

//   // Mobile Swipe
//   const touchStart = useRef<{ x: number; y: number } | null>(null);

//   const onTouchStart = (e: React.TouchEvent) => {
//     const t = e.touches[0];
//     touchStart.current = { x: t.clientX, y: t.clientY };
//   };

//   const onTouchEnd = (e: React.TouchEvent) => {
//     const start = touchStart.current;
//     touchStart.current = null;
//     if (!start) return;
//     const t = e.changedTouches[0];
//     const dx = t.clientX - start.x;
//     const dy = t.clientY - start.y;

//     // Horizontal, deliberate movement only, so vertical scrolls and taps don't trigger it
//     if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
//       go(dx < 0 ? 1 : -1);
//     }
//   };

//   useEffect(() => {
//     if (!isOpen) return;
//     const onKey = (e: KeyboardEvent) => {
//       if (e.key === "ArrowRight") go(1);
//       if (e.key === "ArrowLeft") go(-1);
//     };
//     window.addEventListener("keydown", onKey);
//     return () => window.removeEventListener("keydown", onKey);
//   }, [isOpen, go]);

//   const current = active !== null ? items[active] : null;

//   return (
//     <>
//       <ul className="columns-2 gap-4 md:columns-3 lg:gap-6 w-full min-w-0 max-w-full">
//         {items.map((item, i) => (
//           <li key={item.id} className="mb-4 break-inside-avoid lg:mb-6">
//             <button
//               type="button"
//               onClick={() => open(i)}
//               aria-label={`View larger: ${item.caption ?? `photo ${i + 1}`}`}
//               className="group block w-full min-w-0 max-w-full overflow-hidden rounded-2xl"
//             >
//               <Media
//                 item={item}
//                 sizes="(min-width: 768px) 33vw, 50vw"
//                 className="block h-auto w-full max-w-full transition-transform duration-500 group-hover:scale-105"
//               />
//             </button>
//           </li>
//         ))}
//       </ul>

//       <dialog
//         ref={dialogRef}
//         onClose={() => setActive(null)}
//         className="fixed inset-0 m-0 box-border h-dvh max-h-none w-screen max-w-none overflow-hidden overscroll-none bg-transparent p-0 backdrop:bg-ink/90"
//       >
//         {current && (
//           <div
//             onClick={(e) => {
//               if (e.target === e.currentTarget) close();
//             }}
//             onTouchStart={onTouchStart}
//             onTouchEnd={onTouchEnd}
//             className="absolute inset-0 box-border flex flex-col items-center justify-center gap-4 overflow-hidden p-4 sm:p-6"
//           >
//             <div
//               className="relative min-h-0 min-w-0 max-w-full shrink"
//               style={{
//                 width: `min(calc(100vw - 2rem), ${
//                   (75 * current.width) / current.height
//                 }dvh)`,
//                 aspectRatio: `${current.width} / ${current.height}`,
//                 maxHeight: "75dvh",
//               }}
//             >
//               <Media
//                 item={current}
//                 sizes="(max-width: 639px) calc(100vw - 32px), (max-width: 767px) calc(100vw - 48px), 90vw"
//                 className="block h-full w-full rounded-2xl object-contain"
//               />
//             </div>

//             {current.caption && (
//               <p className="max-w-full wrap-break-word text-center font-display text-xl text-white">
//                 {current.caption}
//               </p>
//             )}
//           </div>
//         )}

//         <button
//           type="button"
//           onClick={close}
//           aria-label="Close"
//           className="absolute right-5 top-5 p-3 text-white transition-colors hover:text-bloom"
//         >
//           <FaXmark size={26} />
//         </button>
//         <button
//           type="button"
//           onClick={() => go(-1)}
//           aria-label="Previous photo"
//           className="absolute left-3 top-1/2 -translate-y-1/2 p-3 text-white transition-colors hover:text-bloom"
//         >
//           <FaChevronLeft size={26} />
//         </button>
//         <button
//           type="button"
//           onClick={() => go(1)}
//           aria-label="Next photo"
//           className="absolute right-3 top-1/2 -translate-y-1/2 p-3 text-white transition-colors hover:text-bloom"
//         >
//           <FaChevronRight size={26} />
//         </button>
//       </dialog>
//     </>
//   );
// }

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FaXmark, FaChevronLeft, FaChevronRight } from "react-icons/fa6";

export type GalleryItem = {
  id: string;
  caption?: string;
  src?: string; //omit for gradient
  width: number;
  height: number;
};

function Media({
  item,
  sizes,
  className,
}: {
  item: GalleryItem;
  sizes: string;
  className: string;
}) {
  if (item.src) {
    return (
      <Image
        src={item.src}
        alt={item.caption ?? ""}
        width={item.width}
        height={item.height}
        sizes={sizes}
        className={className}
      />
    );
  }
  return (
    <div
      className={`bg-linear-to-br from-bloom/40 via-plum/30 to-iris/40 ${className}`}
      style={{ aspectRatio: `${item.width} / ${item.height}` }}
    />
  );
}

export default function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [active, setActive] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const isOpen = active !== null;

  const open = (i: number) => {
    setActive(i);
    dialogRef.current?.showModal();
  };

  const close = () => dialogRef.current?.close();

  const go = useCallback(
    (dir: 1 | -1) =>
      setActive((i) =>
        i === null ? i : (i + dir + items.length) % items.length,
      ),
    [items.length],
  );

  // Mobile Swipe
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;

    // Horizontal, deliberate movement only, so vertical scrolls and taps don't trigger it
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      go(dx < 0 ? 1 : -1);
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, go]);

  const current = active !== null ? items[active] : null;

  return (
    <>
      <ul className="columns-2 gap-4 md:columns-3 lg:gap-6">
        {items.map((item, i) => (
          <li key={item.id} className="mb-4 break-inside-avoid lg:mb-6">
            <button
              type="button"
              onClick={() => open(i)}
              aria-label={`View larger: ${item.caption ?? `photo ${i + 1}`}`}
              className="group block w-full overflow-hidden rounded-2xl"
            >
              <Media
                item={item}
                sizes="(min-width: 768px) 33vw, 50vw"
                className="h-auto w-full transition-transform duration-500 group-hover:scale-105"
              />
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        onClose={() => setActive(null)}
        className="fixed inset-0 m-0 h-full max-h-none w-full max-w-none overflow-hidden overscroll-contain bg-transparent p-0 backdrop:bg-ink/90"
      >
        {current && (
          <div
            onClick={(e) => {
              if (e.target === e.currentTarget) close();
            }}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            className="flex h-full w-full touch-pan-y flex-col items-center justify-center gap-4 p-6"
          >
            <div
              style={{
                width: `min(100%, ${(75 * current.width) / current.height}dvh)`,
                aspectRatio: `${current.width} / ${current.height}`,
              }}
            >
              <Media
                item={current}
                sizes="90vw"
                className="h-full w-full rounded-2xl object-cover"
              />
            </div>
            {current.caption && (
              <p className="font-display text-xl text-white">
                {current.caption}
              </p>
            )}
          </div>
        )}

        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute right-5 top-5 p-3 text-white transition-colors hover:text-bloom"
        >
          <FaXmark size={26} />
        </button>
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous photo"
          className="absolute left-3 top-1/2 -translate-y-1/2 p-3 text-white transition-colors hover:text-bloom"
        >
          <FaChevronLeft size={26} />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next photo"
          className="absolute right-3 top-1/2 -translate-y-1/2 p-3 text-white transition-colors hover:text-bloom"
        >
          <FaChevronRight size={26} />
        </button>
      </dialog>
    </>
  );
}
