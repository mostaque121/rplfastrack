"use client";

import { ArrowDown, ArrowUp, Lock, LockOpen, Plus, Trash2 } from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";
import { FieldPath, FieldValues, useFieldArray, useFormContext, useWatch } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImageUploaderServer } from "@/components/uploader/image-uploader-server";
import { SITE_URL } from "@/config/site";
import { cn } from "@/lib/utils";

import { META_DESCRIPTION_RANGE, META_TITLE_RANGE } from "../completeness";

// Tiptap only loads on the admin pages that render an editor
const RichTextEditor = dynamic(() => import("@/components/rich-text/editor"), {
  ssr: false,
  loading: () => <div className="h-40 animate-pulse rounded-md border bg-muted/40" />,
});

type Field<T extends FieldValues> = FieldPath<T>;

export function RichTextField<T extends FieldValues>({
  name,
  label,
  description,
  minHeight,
}: {
  name: Field<T>;
  label: string;
  description?: string;
  minHeight?: string;
}) {
  const { control } = useFormContext<T>();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          {description && <FormDescription>{description}</FormDescription>}
          <FormControl>
            <RichTextEditor
              value={field.value ?? ""}
              onChange={field.onChange}
              minHeight={minHeight}
              aria-label={label}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function TextField<T extends FieldValues>({
  name,
  label,
  description,
  placeholder,
  className,
}: {
  name: Field<T>;
  label: string;
  description?: string;
  placeholder?: string;
  className?: string;
}) {
  const { control } = useFormContext<T>();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input {...field} value={field.value ?? ""} placeholder={placeholder} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

/** The URL slug: locked once saved, because changing it moves the page. */
export function SlugField<T extends FieldValues>({
  name,
  prefix,
  isNew,
}: {
  name: Field<T>;
  prefix: string;
  isNew: boolean;
}) {
  const { control } = useFormContext<T>();
  const [unlocked, setUnlocked] = useState(isNew);
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>URL</FormLabel>
          <div className="flex items-center gap-2">
            <div className="flex flex-1 items-center rounded-md border border-input shadow-xs focus-within:ring-[3px] focus-within:ring-ring/50">
              <span className="pl-3 text-sm whitespace-nowrap text-muted-foreground">{prefix}</span>
              <FormControl>
                <input
                  {...field}
                  disabled={!unlocked}
                  className="h-9 w-full bg-transparent pr-3 text-sm outline-none disabled:opacity-60"
                />
              </FormControl>
            </div>
            {!isNew && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setUnlocked((v) => !v)}
              >
                {unlocked ? <LockOpen /> : <Lock />}
                {unlocked ? "Lock" : "Change"}
              </Button>
            )}
          </div>
          {!isNew && unlocked && (
            <p className="text-sm text-amber-700">
              Changing the URL moves the page. The old URL gets a 301 redirect automatically, but
              Google takes weeks to update, so only change it if you have to.
            </p>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function LengthCounter({ length, range }: { length: number; range: readonly [number, number] }) {
  const ok = length >= range[0] && length <= range[1];
  return (
    <span className={cn("text-xs tabular-nums", ok ? "text-green-700" : "text-amber-700")}>
      {length} / {range[0]}–{range[1]}
    </span>
  );
}

/** Meta title + description with length counters and a Google snippet preview. */
export function SeoFields<T extends FieldValues>({
  path,
  fallbackTitle,
}: {
  path: string;
  fallbackTitle: string;
}) {
  const { control } = useFormContext<T>();
  const [metaTitle = "", metaDescription = ""] = useWatch({
    control,
    name: ["metaTitle", "metaDescription"] as Field<T>[],
  }) as string[];

  return (
    <div className="space-y-6">
      <FormField
        control={control}
        name={"metaTitle" as Field<T>}
        render={({ field }) => (
          <FormItem>
            <div className="flex items-center justify-between">
              <FormLabel>Meta title</FormLabel>
              <LengthCounter length={metaTitle.trim().length} range={META_TITLE_RANGE} />
            </div>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormDescription>
              The blue link in Google. Lead with the qualification name and code.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={"metaDescription" as Field<T>}
        render={({ field }) => (
          <FormItem>
            <div className="flex items-center justify-between">
              <FormLabel>Meta description</FormLabel>
              <LengthCounter
                length={metaDescription.trim().length}
                range={META_DESCRIPTION_RANGE}
              />
            </div>
            <FormControl>
              <Textarea rows={3} {...field} />
            </FormControl>
            <FormDescription>
              The grey text under the link. Say who it&apos;s for and end with a reason to click.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <div>
        <p className="mb-2 text-sm font-medium">Google preview</p>
        <div className="max-w-150 rounded-lg border bg-white p-4 font-[arial,sans-serif]">
          <p className="truncate text-sm text-[#202124]">
            {SITE_URL.replace("https://", "")}
            <span className="text-[#4d5156]">
              {" "}
              › {path.replace(/^\//, "").replace(/\//g, " › ")}
            </span>
          </p>
          <p className="mt-1 truncate text-xl leading-snug text-[#1a0dab]">
            {metaTitle || fallbackTitle}
          </p>
          <p className="mt-1 line-clamp-2 text-sm text-[#4d5156]">
            {metaDescription || "No meta description yet: Google will pick text from the page."}
          </p>
        </div>
      </div>
    </div>
  );
}

/** FAQ list: add, edit, reorder and remove Q&A pairs. */
export function FaqEditor<T extends FieldValues>({ minimum }: { minimum?: number }) {
  const { control } = useFormContext<T>();
  // useFieldArray needs a concrete array path; both editors name it "faqs"
  const { fields, append, remove, move } = useFieldArray({
    control: control as never,
    name: "faqs" as never,
  });

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        {fields.length} FAQ{fields.length === 1 ? "" : "s"}
        {minimum ? ` (aim for at least ${minimum})` : ""}. Shown on the page and as FAQ rich
        results. Answer the questions people actually search for.
      </p>
      {fields.map((item, index) => (
        <div key={item.id} className="space-y-3 rounded-lg border p-4">
          <div className="flex items-start gap-2">
            <span className="mt-2 text-sm font-medium text-muted-foreground tabular-nums">
              {index + 1}.
            </span>
            <FormField
              control={control}
              name={`faqs.${index}.question` as Field<T>}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input {...field} placeholder="Question" aria-label={`Question ${index + 1}`} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Move up"
              disabled={index === 0}
              onClick={() => move(index, index - 1)}
            >
              <ArrowUp />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Move down"
              disabled={index === fields.length - 1}
              onClick={() => move(index, index + 1)}
            >
              <ArrowDown />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Remove FAQ"
              onClick={() => remove(index)}
            >
              <Trash2 className="text-destructive" />
            </Button>
          </div>
          <RichTextField<T>
            name={`faqs.${index}.answer` as Field<T>}
            label="Answer"
            minHeight="5rem"
          />
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        onClick={() => append({ question: "", answer: "" } as never)}
      >
        <Plus /> Add FAQ
      </Button>
    </div>
  );
}

/** The cover image uploader (Cloudinary) and its alt text. Wide (1500×720); cards crop it. */
export function ImageFields<T extends FieldValues>({ description }: { description?: string }) {
  const { control, setValue, getValues } = useFormContext<T>();
  const set = (name: string, value: string) =>
    setValue(name as Field<T>, value as never, { shouldDirty: true, shouldValidate: true });

  return (
    <div className="space-y-6">
      <FormField
        control={control}
        name={"imageUrl" as Field<T>}
        render={() => (
          <FormItem>
            <FormLabel>Cover image</FormLabel>
            {description && <FormDescription>{description}</FormDescription>}
            <FormControl>
              <ImageUploaderServer
                uploadPreset="service-cover"
                initialImage={getValues("imageUrl" as Field<T>)}
                initialPublicId={getValues("imagePublicId" as Field<T>)}
                onImageUploaded={(link, publicId) => {
                  set("imageUrl", link);
                  set("imagePublicId", publicId);
                }}
                aspectRatio={1500 / 720}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <TextField<T>
        name={"imageAlt" as Field<T>}
        label="Image alt text"
        description="Describe the photo for screen readers and Google Images, e.g. “Carpenter measuring timber on a building site”."
      />
    </div>
  );
}
