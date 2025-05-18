import PropTypes from "prop-types";
function ProfileIcon({ className, fillColor = "", opacity = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 32"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        id="Symbols"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
        opacity={`${opacity == "" ? "0.5" : opacity}`}
      >
        <g
          id="sidebar_only_icons"
          transform="translate(-38.000000, -210.000000)"
        >
          <g id="profile_icon">
            <g transform="translate(32.000000, 209.000000)">
              <polygon id="Path" points="0 0 36 0 36 36 0 36"></polygon>
              <path
                d="M30,33 L27,33 L27,30 C27,27.5147186 24.9852814,25.5 22.5,25.5 L13.5,25.5 C11.0147186,25.5 9,27.5147186 9,30 L9,33 L6,33 L6,30 C6,25.8578644 9.35786438,22.5 13.5,22.5 L22.5,22.5 C26.6421356,22.5 30,25.8578644 30,30 L30,33 Z M17.9999999,19.5 C14.7846097,19.5 11.8134664,17.7846097 10.2057713,15 C8.59807607,12.2153903 8.59807607,8.78460967 10.2057713,6 C11.8134664,3.21539025 14.7846097,1.5 17.9999999,1.5 C22.9705627,1.5 26.9999999,5.52943725 26.9999999,10.5 C26.9999999,15.4705627 22.9705627,19.5 17.9999999,19.5 L17.9999999,19.5 Z M18,16.5 C21.3137085,16.5 24,13.8137085 24,10.5 C24,7.1862915 21.3137085,4.5 18,4.5 C14.6862915,4.5 12,7.1862915 12,10.5 C12,13.8137085 14.6862915,16.5 18,16.5 Z"
                id="Shape"
                fill={`${fillColor == "" ? "#313131" : fillColor}`}
                fillRule="nonzero"
              ></path>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

function LogoutIcon({ className, fillColor = "", opacity = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 29 30"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        id="Symbols"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
        opacity={`${opacity == "" ? "0.5" : opacity}`}
      >
        <g
          id="sidebar_only_icons"
          transform="translate(-38.000000, -1220.000000)"
        >
          <g id="logout">
            <g transform="translate(0.000000, 1189.000000)">
              <g id="logout_icon" transform="translate(32.000000, 28.000000)">
                <polygon id="Path" points="0 0 36 0 36 36 0 36"></polygon>
                <path
                  d="M7.5,33 C6.67157288,33 6,32.3284271 6,31.5 L6,4.5 C6,3.67157288 6.67157288,3 7.5,3 L28.5,3 C29.3284271,3 30,3.67157288 30,4.5 L30,9 L27,9 L27,6 L9,6 L9,30 L27,30 L27,27 L30,27 L30,31.5 C30,32.3284271 29.3284271,33 28.5,33 L7.5,33 Z M27,24 L27,19.5 L16.5,19.5 L16.5,16.5 L27,16.5 L27,12 L34.5,18 L27,24 Z"
                  id="Shape"
                  fill={`${fillColor == "" ? "#313131" : fillColor}`}
                  fillRule="nonzero"
                ></path>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}
function AddWaiverIcon({ className, opacity = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 28 30"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        id="Symbols"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
        opacity={`${opacity == "" ? "0.5" : opacity}`}
      >
        <g
          id="sidebar_only_icons"
          transform="translate(-36.000000, -30.000000)"
        >
          <g id="add_new_waiver_icon">
            <g transform="translate(32.000000, 27.000000)">
              <polygon id="Path" points="0 0 36 0 36 36 0 36"></polygon>
              <path
                d="M22.5,6 L7.5,6 L7.5,30 L28.5,30 L28.5,12 L22.5,12 L22.5,6 Z M4.5,4.488 C4.5,3.666 5.1705,3 5.9985,3 L24,3 L31.5000371,10.5 L31.5000371,31.4895 C31.5027945,31.8873277 31.3474332,32.2699704 31.0680956,32.5532462 C30.7887581,32.8365221 30.4083278,32.997225 30.0105,33 L5.9895,33 C5.16983332,32.9942883 4.50653759,32.3316605 4.5,31.512 L4.5,4.488 Z M16.5,16.5 L16.5,12 L19.5,12 L19.5,16.5 L24,16.5 L24,19.5 L19.5,19.5 L19.5,24 L16.5,24 L16.5,19.5 L12,19.5 L12,16.5 L16.5,16.5 Z"
                id="Shape"
                fill="#313131"
                fillRule="nonzero"
              ></path>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}
function MyWaiverIcon({ className, opacity = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 28 30"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        id="Symbols"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
        opacity={`${opacity == "" ? "0.5" : opacity}`}
      >
        <g
          id="sidebar_only_icons_lawyer"
          transform="translate(-36.000000, -30.000000)"
        >
          <g id="Group">
            <g transform="translate(0.000000, 27.000000)">
              <g id="my_waivers" transform="translate(32.000000, 0.000000)">
                <polygon id="Path" points="0 0 36 0 36 36 0 36"></polygon>
                <path
                  d="M10.5,9 L10.5,4.5 C10.5,3.67157288 11.1715729,3 12,3 L30,3 C30.8284271,3 31.5,3.67157288 31.5,4.5 L31.5,25.5 C31.5,26.3284271 30.8284271,27 30,27 L25.5,27 L25.5,31.5 C25.5,32.328 24.825,33.000027 23.9895,33.000027 L6.0105,33.000027 C5.61098019,33.002395 5.22697979,32.8454656 4.94348794,32.5639444 C4.65999609,32.2824232 4.50039195,31.8995268 4.5,31.5 L4.5045,10.5 C4.5045,9.672 5.1795,9 6.0135,9 L10.5,9 Z M7.503,12 L7.5,30 L22.5,30 L22.5,12 L7.503,12 Z M13.5,9 L25.5,9 L25.5,24 L28.5,24 L28.5,6 L13.5,6 L13.5,9 Z M10.5,16.5 L19.5,16.5 L19.5,19.5 L10.5,19.5 L10.5,16.5 Z M10.5,22.5 L19.5,22.5 L19.5,25.5 L10.5,25.5 L10.5,22.5 Z"
                  id="Shape"
                  fill="#313131"
                  fillRule="nonzero"
                ></path>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

function HamburgerIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="24" height="3" fill="currentColor" />
      <rect y="6" width="24" height="3" fill="currentColor" />
      <rect x="7" y="12" width="17" height="3" fill="currentColor" />
    </svg>
  );
}

function MenuCloseIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="3.00024"
        width="24"
        height="3"
        transform="rotate(45 3.00024 0)"
        fill="currentColor"
      />
      <rect
        x="1.00024"
        y="17"
        width="24"
        height="3"
        transform="rotate(-45 1.00024 17)"
        fill="currentColor"
      />
    </svg>
  );
}

ProfileIcon.propTypes = {
  className: PropTypes.string.isRequired,
  fillColor: PropTypes.string,
  opacity: PropTypes.number,
};
LogoutIcon.propTypes = {
  className: PropTypes.string.isRequired,
  fillColor: PropTypes.string,
  opacity: PropTypes.number,
};
AddWaiverIcon.propTypes = {
  className: PropTypes.string.isRequired,
  opacity: PropTypes.number,
};
MyWaiverIcon.propTypes = {
  className: PropTypes.string.isRequired,
  opacity: PropTypes.number,
};

HamburgerIcon.propTypes = {
  className: PropTypes.string.isRequired,
};

MenuCloseIcon.propTypes = {
  className: PropTypes.string.isRequired,
};

export {
  ProfileIcon,
  LogoutIcon,
  AddWaiverIcon,
  MyWaiverIcon,
  HamburgerIcon,
  MenuCloseIcon,
};
