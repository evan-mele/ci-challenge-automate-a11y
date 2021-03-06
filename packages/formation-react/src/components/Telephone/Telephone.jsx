import React from 'react';
import PropTypes from 'prop-types';

export const CONTACTS = Object.freeze({
  '222_VETS': '8772228387', // VA Help Line
  '4AID_VET': '8774243838', // National Call Center for Homeless Veterans
  911: '911',
  CAREGIVER: '8552603274', // VA National Caregiver Support Line
  CRISIS_LINE: '8002738255', // Veterans Crisis hotline
  CRISIS_TTY: '8007994889', // Veterans Crisis hotline TTY
  DS_LOGON: '8005389552', // Defense Manpower Data Center
  DS_LOGON_TTY: '8663632883', // Defense Manpower Data Center TTY
  GI_BILL: '8884424551', // Education Call Center (1-888-GI-BILL-1)
  GO_DIRECT: '8003331795', // Go Direct/Direct Express (Treasury)
  HELP_DESK: '8555747286', // VA Help desk
  HELP_TTY: '8008778339', // VA Help Desk TTY
  MY_HEALTHEVET: '8773270022', // My HealtheVet help desk
  NCA: '8005351117', // National Cemetery Scheduling Office
  TESC: '8882242950', // U.S. Treasury Electronic Payment Solution Center
  VA_311: '8446982311', // VA Help desk (VA311)
  VA_BENEFITS: '8008271000', // Veterans Benefits Assistance
});

// Patterns used in formatting visible text
export const PATTERNS = {
  911: '###', // needed to match 911 CONTACT
  DEFAULT: '###-###-####',
  OUTSIDE_US: '+1-###-###-####',
};

// Custom aria labels (only used internally)
const LABELS = {
  911: '1. 9 1 1.',
};

/**
 * Parse the raw phone number string. And strip out leading "1" and any
 * non-digits
 * @param {string} number - raw phone number input
 * @return {string} - string containing only numbers
 */
const parseNumber = number =>
  number
    .replace(/^1/, '') // strip leading "1" from telephone number
    .replace(/[^\d]/g, '');

/**
 * Insert the provided number into the pattern
 * @param {string} num - parsed number string (no non-digits included)
 * @param {string} pattern - provided pattern (using "#") for link text
 * @return {string} - formatted phone number for link text
 */
// Create link text from pattern
const formatTelText = (num, pattern) => {
  let i = 0;
  return pattern.replace(/#/g, () => num[i++] || '');
};

/**
 * Add a space between each number part
 * @param {string} number - number part, e.g. area code, prefix, line number
 * @return {string} - formatted number part for use in aria-label
 */
const formatTelLabelBlock = number => number.split('').join(' ');

/**
 * Format telephone number for label
 * @param {string} number - Expected a phone number with or without dashes that
 * matches the number of "#" within the default or set pattern
 * @return {string} - Combined phone number parts within the label separated by
 * periods, e.g. "800-555-1212" becomes "8 0 0. 5 5 5. 1 2 1 2"
 */
const formatTelLabel = number =>
  number
    .split(/[^\d]+/)
    .filter(n => n)
    .map(formatTelLabelBlock)
    .join('. ');

/**
 * Telephone component
 * @param {string|number} contact (required) - telephone number, with or without
 *  formatting; all non-digit characters will be stripped out
 * @param {string} extension (optional) - telephone extension
 * @param {string} className (optional) - additional space-separated class names
 *  to add to the link
 * @param {string} pattern (optional) - Link text format pattern, using "#" as
 *  the digit placeholder
 * @param {string} ariaLabel (optional) - if included, this custom aria-label
 *  will replace the generated aria-label
 * @param {function} onClick (optional) - function called when the link is
 *  clicked
 * @param {string|JSX} children (optional) - if included, this custom
 *  telephone link text will replace the generated text; the pattern passed in
 *  will be ignored
 */
function Telephone({
  // phone number (length _must_ match the pattern; leading "1" is removed)
  contact = '', // telephone number
  extension = '', // phone extension
  className = '', // additional css class to add
  pattern = '', // output format; defaults to patterns.default value
  ariaLabel = '', // custom aria-label
  onClick = () => {},
  children,
}) {
  // strip out non-digits for use in href: "###-### ####" => "##########"
  const parsedNumber = parseNumber(contact.toString());
  const phoneNumber = CONTACTS[parsedNumber] || parsedNumber;

  // Capture "911" pattern here
  const contactPattern = pattern || PATTERNS[parsedNumber] || PATTERNS.DEFAULT;
  const patternLength = contactPattern.match(/#/g).length;
  const formattedNumber = formatTelText(phoneNumber, contactPattern, extension);

  if (!phoneNumber || phoneNumber.length !== patternLength) {
    throw new Error(
      `Contact number "${phoneNumber}" does not match the pattern (${contactPattern})`,
    );
  }

  const formattedAriaLabel =
    ariaLabel ||
    LABELS[parsedNumber] || // custom 911 aria-label
    `${formatTelLabel(formattedNumber)}${
      extension ? `. extension ${formatTelLabelBlock(extension)}.` : '.'
    }`;

  // Add a "+1" to the tel for all included patterns
  const isIncludedPattern = Object.values(PATTERNS).includes(contactPattern);
  const href = `tel:${isIncludedPattern ? `+1${phoneNumber}` : phoneNumber}${
    // extension format ";ext=" from RFC3966 https://tools.ietf.org/html/rfc3966#page-5
    // but it seems that using a comma to pause for 2 seconds might be a better
    // solution - see https://dsva.slack.com/archives/C8E985R32/p1589814301103200
    extension ? `,${extension}` : ''
  }`;

  return (
    <a
      className={`no-wrap ${className}`}
      href={href}
      aria-label={formattedAriaLabel}
      onClick={onClick}
    >
      {children ||
        `${formattedNumber}${extension ? `, ext. ${extension}` : ''}`}
    </a>
  );
}

Telephone.propTypes = {
  /**
   * Pass a telephone number as a string, or use a known phone number in
   * CONTACTS. Any number with a leading "1" will be stripped off (assuming
   * country code). Whitespace and non-digits will be stripped out of this
   * string.
   */
  contact: PropTypes.string.isRequired,

  /**
   * Options extension for the telephone number. Only include the numbers,
   * "ext" will be added automatically along with "extension" within the
   * aria-label
   */
  extension: PropTypes.string,

  /**
   * Additional class name to add to the link.
   */
  className: PropTypes.string,

  /**
   * Pattern use used while formatting the contact number. Use provided
   * PATTERNS, or create a custom one using "#" as a placeholder for each
   * number. Note that the number of "#"'s in the pattern <em>must</em> equal
   * the contact number length or an error is thrown.
   */
  pattern: PropTypes.string,

  /**
   * Custom aria-label string.
   */
  ariaLabel: PropTypes.string,

  /**
   * Custom onClick function
   */
  onClick: PropTypes.func,
};

export default Telephone;
