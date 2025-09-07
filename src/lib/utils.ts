import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { sendGTMEvent as googleSendGTMEvent } from "@next/third-parties/google";
import { UAParser } from "ua-parser-js";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface IgtmEventProps {
  event: ANALYTICS_EVENTS;
  value?: string;
}

/**
 * Fire Google Tag Manager (GTM) event with given parameters.
 * This is a reusable function to send any event to GTM.
 *
 * @param gtmEventProps
 */
export function sendGTMEvent(gtmEventProps: IgtmEventProps): void {
  const { event, value } = gtmEventProps;
  const parser = new UAParser();
  const browser = parser?.getBrowser();
  const device = parser?.getDevice();
  const gtmEventData = {
    event,
    value,
    browser,
    device,
    timestamp: new Date().toISOString(),
  };

  if (typeof window !== "undefined" && window.dataLayer) {
    window.dataLayer.push(gtmEventData);
  } else {
    console.error("GTM dataLayer is not available or GTM is not initialized.");
  }
  googleSendGTMEvent(gtmEventData);
}

export enum ANALYTICS_EVENTS {
  // Navigation Events
  HOME_TAB_CLICKED = "home-tab-clicked",
  PROJECTS_TAB_CLICKED = "projects-tab-clicked",
  SKILLS_TAB_CLICKED = "skills-tab-clicked",
  EXPERIENCE_TAB_CLICKED = "experience-tab-clicked",
  CONTACT_TAB_CLICKED = "contact-tab-clicked",

  // Project View Events
  HARE_KRSNA_PROJECT_VIEWED = "hare-krsna-project-viewed",
  SAMZZ_GO_PROJECT_VIEWED = "samzz-go-project-viewed",
  MY_MAPS_PROJECT_VIEWED = "my-maps-project-viewed",
  QUOTE_PROJECT_VIEWED = "quote-project-viewed",

  // Interaction Events
  GET_IN_TOUCH_CLICKED = "get-in-touch-button-clicked",
  INTRO_VIDEO_PLAYED = "intro-video-played",
  SOCIAL_LINK_CLICKED = "social-link-clicked",

  // Additional useful events
  RESUME_DOWNLOADED = "resume-downloaded",
  PROJECT_DEMO_CLICKED = "project-demo-clicked",
  GITHUB_LINK_CLICKED = "github-link-clicked",
  LINKEDIN_PROFILE_CLICKED = "linkedin-profile-clicked",
  EMAIL_COPIED = "email-copied",
  PHONE_COPIED = "phone-copied",
}
