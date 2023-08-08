import { Field } from "formik";
import React from "react";

const states = [
  "PA",
  "AL",
  "AK",
  "AS",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "DC",
  "FM",
  "FL",
  "GA",
  "GU",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MH",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "MP",
  "OH",
  "OK",
  "OR",
  "PW",
  "PR",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VI",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
];

const allStyle =
  "py-2 px-4 shadow-sm focus:ring-gray-700 focus:border-gray-600 block w-full sm:text-sm border-solid border-2 border-gray-600 rounded-md";

const divClass = "my-4";

export function StyledLabel({ label, labelFor, required, tint }) {
  // console.log(label, labelFor, required)

  const style =
    tint !== "light"
      ? "block text-sm font-medium text-gray-700"
      : "block text-sm font-medium text-gray-200";

  return (
    <label className={style} htmlFor={labelFor}>
      {label}
      {required ? (
        <span className="text-sm text-red-800"> (required)</span>
      ) : (
        ""
      )}
    </label>
  );
}

export function StyledTextInput({ name, id, placeholder, required, onChange }) {
  return (
    <input
      id={id ? id : ""}
      type={"text"}
      name={name}
      placeholder={placeholder}
      required={required ? required : ""}
      onChange={onChange}
      className="py-2 px-4 shadow-sm focus:ring-gray-700 focus:border-gray-600 block w-full sm:text-sm border-solid border-2 border-gray-600 rounded-md"
    />
  );
}

export function StyledFormikPhoneInput({
  name,
  id,
  required,
  label = false,
  tint,
}) {
  return (
    <div className={divClass}>
      {label ? (
        <StyledLabel
          label={label}
          labelFor={name}
          required={required}
          tint={tint}
        />
      ) : (
        ""
      )}
      <Field
        required={required}
        name={name}
        id={id}
        placeholder="Enter phone number"
        className={allStyle}
      />
    </div>
  );
}

export function StyledFormikTextInput({
  name,
  placeholder,
  required,
  autoComplete,
  id,
  label = false,
  tint,
}) {
  return (
    <div>
      {label ? (
        <StyledLabel
          label={label}
          labelFor={name}
          required={required}
          tint={tint}
        />
      ) : (
        ""
      )}
      <Field
        type={"text"}
        id={id ? id : name}
        name={name}
        placeholder={placeholder}
        required={required}
        className={allStyle}
        autoComplete={autoComplete ? autoComplete : ""}
      />
    </div>
  );
}

export function StyledNameInput({ label, required, preId, tint }) {
  var namePre = preId !== undefined ? preId : "";

  return (
    <div className={divClass}>
      <StyledLabel
        label={label}
        labelFor={namePre + "fullName"}
        required={required}
        tint={tint}
      />
      <div
        id={namePre !== "" ? namePre + "FullName" : "fullName"}
        className="grid grid-cols-1 md:grid-cols-2 gap-2"
      >
        <Field
          type={"text"}
          id={namePre !== "" ? namePre + "_first_name" : "first_name"}
          name={namePre !== "" ? namePre + "_first_name" : "first_name"}
          placeholder={"First Name"}
          required={required}
          className={allStyle}
        />
        <Field
          type={"text"}
          id={namePre !== "" ? namePre + "_last_name" : "last_name"}
          name={namePre !== "" ? namePre + "_last_name" : "last_name"}
          placeholder={"Last Name"}
          required={required}
          className={allStyle}
        />
      </div>
    </div>
  );
}

export function StyledEmailInput({ name, id, onChange }) {
  // console.log( onChange)

  return (
    <input
      id={id ? id : ""}
      placeholder={"example@example.com"}
      type={"email"}
      name={name}
      required
      onChange={onChange}
      className="py-2 px-4 shadow-sm focus:ring-gray-700 focus:border-gray-600 block w-full sm:text-sm border-solid border-2 border-gray-600 rounded-md"
    />
  );
}

export function StyledFormikEmailInput({
  name,
  id,
  autoComplete,
  label = false,
  tint,
}) {
  return (
    <div className={divClass}>
      {label ? (
        <StyledLabel
          label={label}
          labelFor={name}
          required={true}
          tint={tint}
        />
      ) : (
        ""
      )}

      <Field
        id={id ? id : ""}
        placeholder={"example@example.com"}
        type={"email"}
        name={name}
        required
        className={allStyle}
        autoComplete={autoComplete ? autoComplete : ""}
      />
    </div>
  );
}

export function StyledCheckboxes({ options, id }) {
  return (
    <div id={id} className="grid grid-cols-4">
      {options.map((option, oIndex) =>
        option?.label ? (
          <StyledCheckbox
            label={option.label}
            value={option.value}
            name={id}
            id={option.value}
          />
        ) : (
          <StyledCheckbox label={option} value={option} name={id} id={option} />
        )
      )}
    </div>
  );
}

export function StyledFormikCheckboxes({ options, id, tint, label = false }) {
  return (
    <div className={divClass}>
      {label ? (
        <StyledLabel label={label} labelFor={id} required={true} tint={tint} />
      ) : (
        ""
      )}
      <div
        id={id}
        className="flex flex-col"
        role="group"
        aria-labelledby="checkbox-group"
      >
        {options.map((option, oIndex) => (
          <StyledFormikCheckbox
            option={option}
            id={id}
            tint={tint}
            key={oIndex}
          />
        ))}
      </div>
    </div>
  );
}

export function StyledFormikCheckbox({ option, id, tint, onChange }) {
  // console.log(option)
  // console.log(onChange)
  var checked = false;

  let label = "";
  let value = "";
  if (option?.name && option?.slug) {
    return (
      <label
        className={
          (tint === "dark" || tint === undefined
            ? "text-gray-100"
            : "text-gray-700") + " font-medium text-base pl-2 pt-2"
        }
      >
        <Field
          className="mr-2"
          type="checkbox"
          name={id}
          value={option.databaseId}
        />{" "}
        {option.name}
      </label>
    );
  } else if (option?.label && option?.value) {
    return (
      <label
        className={
          (tint === "dark" || tint === undefined
            ? "text-gray-100"
            : "text-gray-700") + " font-medium text-base pl-2 pt-2"
        }
      >
        <Field
          className="mr-2"
          type="checkbox"
          name={id}
          value={option.value}
        />{" "}
        {option.label}
      </label>
    );
  } else {
    return (
      <label
        className={
          (tint === "dark" || tint === undefined
            ? "text-gray-100"
            : "text-gray-700") + " font-medium text-base pl-2 pt-2"
        }
      >
        <input
          className="mr-2 pl-2 pt-2"
          type="checkbox"
          id={id}
          name={id}
          checked={checked}
          value={value}
          onChange={onChange}
        />{" "}
        {label}
      </label>
    );
  }
}

export function StyledCheckbox({ label, value, name, id, checked }) {
  return (
    <label className="text-sm font-medium text-gray-600 p-2">
      <input
        className="mr-2"
        type="checkbox"
        id={id}
        name={name}
        checked={checked}
        value={value}
      />
      {label}
    </label>
  );
}

export function StyledRadios({ options, id }) {
  return (
    <div id={id} className="grid grid-cols-4">
      {options.map((option, oIndex) => (
        <StyledRadio
          label={option.label}
          value={option.value}
          name={id}
          id={option.value}
        />
      ))}
    </div>
  );
}

export function StyledFormikRadios({ options, id, tint, label = false }) {
  return (
    <div className={divClass} id={id}>
      {label ? (
        <StyledLabel label={label} labelFor={id} required={true} tint={tint} />
      ) : (
        ""
      )}
      <div
        role="group"
        aria-labelledby="my-radio-group"
        className="grid grid-cols-4"
      >
        {options.map((option, oIndex) => (
          <label
            key={oIndex}
            className={
              (tint === "dark" || tint === undefined
                ? "text-gray-100"
                : "text-gray-700") + " text-sm font-medium p-2"
            }
          >
            <Field
              type="radio"
              name={id}
              value={option.value}
              className="mr-2"
            />{" "}
            {option.label}
          </label>
        ))}
      </div>
    </div>
  );
}

export function StyledRadio({ label, value, name, id, checked }) {
  return (
    <label className="text-sm font-medium text-gray-600 p-2">
      <input
        className="mr-2"
        type="radio"
        name={name}
        checked={checked}
        value={value}
      />
      {label}
    </label>
  );
}

export function StyledRadiosMore({ options, id, onChange }) {
  return (
    <div id={id} className="grid grid-cols-4">
      {options.map((option, oIndex) => (
        <StyledRadioMore
          label={option.label}
          key={oIndex}
          value={option.value}
          name={id}
          id={option.value}
          checked={option.checked}
          onChange={onChange}
        />
      ))}
    </div>
  );
}

export function StyledRadioMore({ label, value, name, id, checked, onChange }) {
  // console.log(that)
  return (
    <label className="text-sm font-medium text-gray-600 p-2">
      <input
        className="mr-2"
        type="radio"
        name={name}
        checked={checked}
        value={value}
        onChange={onChange}
      />
      {label}
    </label>
  );
}

export function StyledFormikRadiosMore({
  options,
  id,
  onChange,
  tint,
  label = false,
}) {
  return (
    <div id={id}>
      {label ? (
        <StyledLabel label={label} labelFor={id} required={true} tint={tint} />
      ) : (
        ""
      )}
      <div
        role="group"
        aria-labelledby="my-radio-group"
        className="grid grid-cols-4"
      >
        {options.map((option, oIndex) => (
          <label
            key={oIndex}
            className={
              (tint === "dark" || tint === undefined
                ? "text-gray-100"
                : "text-gray-700") + " text-sm font-medium p-2"
            }
          >
            <Field
              type="radio"
              name={id}
              value={option.value}
              className="mr-2"
              onClick={onChange}
            />{" "}
            {option.label}
          </label>
        ))}
      </div>
    </div>
  );
}

export function StyledFormikRadioMore({
  label,
  value,
  name,
  id,
  checked,
  onChange,
  tint,
}) {
  // console.log(tint)
  return (
    <label
      className={
        (tint === "dark" || tint === undefined
          ? "text-gray-100"
          : "text-gray-700") + " text-sm font-medium p-2"
      }
    >
      <Field
        className="mr-2"
        type="radio"
        name={name}
        checked={checked}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {label}
    </label>
  );
}

export function StyledRadiosGroup({ options, id, onChange }) {
  return (
    <div id={id} aria-labelledby={id + "-group"} className="grid grid-cols-4">
      {options.map((option, oIndex) => (
        <StyledRadioField
          label={option.label}
          key={oIndex}
          value={option.value}
          name={id}
          onChange={onChange}
        />
      ))}
    </div>
  );
}

export function StyledRadioField({ label, value, name, onChange }) {
  // console.log(that)
  return (
    <label className="text-sm font-medium text-gray-600 p-2">
      <Field type="radio" name={name} value={value} />
      {label}
    </label>
  );
}

export function StyledSelect({ options, id, onChange }) {
  return (
    <select
      name={id}
      id={id}
      onChange={onChange}
      className="py-2 px-4 shadow-sm focus:ring-gray-700 focus:border-gray-600 block w-full sm:text-sm border-solid border-2 border-gray-600 rounded-md"
    >
      {options.map((option, oIndex) => (
        <StyledSelectOption value={option} key={oIndex} />
      ))}
    </select>
  );
}

export function StyledFormikSelect({ options, id, tint, label = false }) {
  return (
    <div>
      {label ? (
        <StyledLabel label={label} labelFor={id} required={true} tint={tint} />
      ) : (
        ""
      )}
      <Field as="select" name={id} id={id} className={allStyle}>
        {options.map((option, oIndex) =>
          option?.value ? (
            <StyledSelectOption value={option.value} key={oIndex} />
          ) : (
            <StyledSelectOption value={option} key={oIndex} />
          )
        )}
      </Field>
    </div>
  );
}

export function StyledSelectOption({ value }) {
  return <option value={value}>{value}</option>;
}

export function StyledTextarea({ placeholder, name, id }) {
  return (
    <textarea
      rows="5"
      id={id}
      name={name}
      placeholder={placeholder ? placeholder : " "}
      className="py-2 px-4 shadow-sm focus:ring-gray-700 focus:border-gray-600 block w-full sm:text-sm border-solid border-2 border-gray-600 rounded-md"
    />
  );
}

export function StyledFormikTextarea({ placeholder, name, id, tint, label }) {
  return (
    <div className={divClass}>
      <StyledLabel label={label} labelFor={id} required={false} tint={tint} />
      <Field
        as={"textarea"}
        rows="5"
        id={id}
        name={name}
        placeholder={placeholder ? placeholder : " "}
        className={allStyle}
      />
    </div>
  );
}

export function StyledSubmitButton({ text }) {
  return (
    <button
      type="submit"
      className="z-10 inline-flex items-center justify-center px-5 py-3 border 
                      border-transparent text-base font-medium rounded-md 
                      bg-gray-700 hover:bg-balsam-fir-500
              text-gray-100 hover:text-gray-700"
    >
      {text}
    </button>
  );
}

export function StyledAddressParts({ required }) {
  /*
   * Return:
   *
   * Street Address 1
   * Street Address 2
   * City, State, Zip
   *
   */
  // console.log( required )
  // console.log( formik )

  return (
    <div id="shipping_address">
      {/* Street Address 1 */}
      <div className="my-2">
        <StyledLabel
          label={"Street Address 1"}
          labelFor={"street_address_1"}
          required={true}
        />
        <StyledTextInput
          name={"StreetAddress1"}
          id={"street_address_1"}
          required={true}
        />
      </div>

      {/* Street Address 2 */}
      <div className="my-2">
        <StyledLabel
          label={"Street Address 2"}
          labelFor={"street_address_2"}
          required={false}
        />
        <StyledTextInput name={"StreetAddress2"} id={"street_address_2"} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* City */}
        <div className="col-span-1 md:col-span-3">
          <StyledLabel label={"City"} labelFor={"city"} required={true} />
          <StyledTextInput name={"City"} id={"city"} required={true} />
        </div>

        {/* State */}
        <div className="col-span-1">
          <StyledLabel label={"State"} labelFor={"state"} required={true} />
          <StyledSelect options={states} id={"state"} required={true} />
        </div>

        {/* Zip Code */}
        <div className="col-span-1">
          <StyledLabel
            label={"Zip Code"}
            labelFor={"zip_code"}
            required={true}
          />
          <StyledTextInput name={"ZipCode"} id={"zip_code"} required={true} />
        </div>
      </div>
    </div>
  );
}

export function StyledFormikAddressParts({
  idPre,
  tint,
  label,
  required = false,
}) {
  /*
   * Return:
   *
   * Street Address 1
   * Street Address 2
   * City, State, Zip
   *
   */

  var addPre = idPre !== undefined ? idPre : "";

  return (
    <div className={divClass}>
      <StyledLabel
        label={label}
        labelFor={idPre !== undefined ? idPre + "Address" : "address"}
        required={required}
        tint={tint}
      />

      <div id={idPre !== undefined ? idPre + "Address" : "address"}>
        {/* Street Address 1 */}
        <div className={divClass}>
          <StyledFormikTextInput
            name={
              idPre !== undefined
                ? idPre + "_street_address_1"
                : "street_address_1"
            }
            id={
              idPre !== undefined
                ? idPre + "_street_address_1"
                : "street_address_1"
            }
            tint={tint}
            placeholder={"Street Address"}
            required={required}
          />
        </div>

        {/* Street Address 2 */}
        <div className={divClass}>
          <StyledFormikTextInput
            name={
              idPre !== undefined
                ? idPre + "_street_address_2"
                : "street_address_2"
            }
            id={
              idPre !== undefined
                ? idPre + "_street_address_2"
                : "street_address_2"
            }
            tint={tint}
            placeholder={"Street Address Line 2"}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 my-2 gap-4">
          {/* City */}
          <div className="col-span-1 md:col-span-3">
            <StyledFormikTextInput
              name={idPre !== undefined ? idPre + "_city" : "city"}
              id={idPre !== undefined ? idPre + "_city" : "city"}
              tint={tint}
              placeholder={"City"}
              required={required}
            />
          </div>

          {/* State */}
          <div className="col-span-1">
            <StyledFormikSelect
              options={states}
              id={idPre !== undefined ? idPre + "_state" : "state"}
              tint={tint}
              value={""}
            />
          </div>

          {/* Zip Code */}
          <div className="col-span-1">
            <StyledFormikTextInput
              name={idPre !== undefined ? idPre + "_zip_code" : "zip_code"}
              id={idPre !== undefined ? idPre + "_zip_code" : "zip_code"}
              tint={tint}
              placeholder={"Zip Code"}
              required={required}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function getRecaptchaKey() {
  return "6LeQkegjAAAAAPgbw6FYRLSJoGY-D_RgyMO12M56";
}

export function getRecaptchaSecretKey() {
  return "6LeQkegjAAAAAOxiUqLjudzpIbZKBjBKxcWToV6F";
}
