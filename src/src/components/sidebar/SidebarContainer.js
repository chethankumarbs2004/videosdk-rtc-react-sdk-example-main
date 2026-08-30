import { useMeeting } from "@videosdk.live/react-sdk";
import React, { Fragment } from "react";
import { XIcon } from "@heroicons/react/outline";
import { ChatPanel } from "./ChatPanel";
import { ParticipantPanel } from "./ParticipantPanel";
import { Dialog, Transition } from "@headlessui/react";
import { useMediaQuery } from "react-responsive";
import { useMeetingAppContext } from "../../MeetingAppContextDef";

const SideBarTabView = ({
  height,
  sideBarContainerWidth,
  panelHeight,
  panelHeaderHeight,
  panelHeaderPadding,
  panelPadding,
  handleClose,
}) => {
  const { participants } = useMeeting();
  const { sideBarMode } = useMeetingAppContext();

  return (
    <div
      className="bg-gray-800"
      style={{
        height,
        width: sideBarContainerWidth,
        paddingTop: panelPadding,
        paddingLeft: panelPadding,
        paddingRight: panelPadding,
        paddingBottom: panelPadding,
      }}
    >
      <div>
        <div
          className="bg-gray-750"
          style={{
            height: height,
            borderRadius: 10,
            overflow: "hidden",
          }}
        >
          <>
            {sideBarMode && (
              <div
                className={`flex items-center justify-between`}
                style={{
                  padding: panelHeaderPadding,
                  height: panelHeaderHeight - 1,
                  borderBottom: "1px solid #70707033",
                }}
              >
                <p className="text-base text-white font-bold">
                  {sideBarMode === "PARTICIPANTS"
                    ? `${
                        sideBarMode.charAt(0).toUpperCase() +
                          sideBarMode.slice(1).toLowerCase() || ""
                      } (${new Map(participants)?.size})`
                    : sideBarMode.charAt(0).toUpperCase() +
                        sideBarMode.slice(1).toLowerCase() || ""}
                </p>
                <button
                  className="text-white"
                  onClick={handleClose}
                  style={{ margin: 0, padding: 0 }}
                >
                  <XIcon className="h-5 w-5" />
                </button>
              </div>
            )}
            {sideBarMode === "PARTICIPANTS" ? (
              <ParticipantPanel panelHeight={panelHeight} />
            ) : sideBarMode === "CHAT" ? (
              <ChatPanel panelHeight={panelHeight} />
            ) : null}
          </>
        </div>
      </div>
    </div>
  );
};

export function SidebarConatiner({ height, sideBarContainerWidth }) {
  const { raisedHandsParticipants, sideBarMode, setSideBarMode } =
    useMeetingAppContext();
  const isLGDesktop = useMediaQuery({ minWidth: 1024, maxWidth: 1439 });
  const isXLDesktop = useMediaQuery({ minWidth: 1440 });

  const panelPadding = 8;

  const paddedHeight = height - panelPadding * 3.5;

  const panelHeaderHeight =
  isLGDesktop
    ? 48
    : isXLDesktop
    ? 52
    : 0;

  const panelHeaderPadding = 
     isLGDesktop
    ? 10
    : isXLDesktop
    ? 12
    : 0;

  const handleClose = () => {
    setSideBarMode(null);
  };

  return sideBarMode ? (
      <SideBarTabView
        height={paddedHeight}
        sideBarContainerWidth={sideBarContainerWidth}
        panelHeight={paddedHeight - panelHeaderHeight - panelHeaderPadding}
        raisedHandsParticipants={raisedHandsParticipants}
        panelHeaderHeight={panelHeaderHeight}
        panelHeaderPadding={panelHeaderPadding}
        panelPadding={panelPadding}
        handleClose={handleClose}
      />
    
  ) : (
    <>
    </>
  );
}
