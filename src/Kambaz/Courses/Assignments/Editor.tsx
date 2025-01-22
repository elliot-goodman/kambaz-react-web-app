export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <h3>
        <label htmlFor="wd-name">Assignment Name</label>
      </h3>
      <input id="wd-name" value="A1 - ENV + HTML" />
      <br />
      <br />
      <textarea id="wd-description" style={{ width: "400px", height: "160px" }}>
        The assignment is available online Submit a link to the landing page of
        your Web application running on Netlify. The landing page should include
        the following: Your full name and section. Links to each of the lab
        assignments. Link to the Kanbaz application. Links to all relevant
        source code repositories. The Kanbaz application should include a link
        to navigate back to the landing page.
      </textarea>
      <br />
      <table>
        <br />
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-points">Points</label>
          </td>
          <td>
            <input id="wd-points" value={100} />
          </td>
        </tr>
        <br />
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-group">Assignment Group</label>
          </td>
          <select id="wd-group">
            <option>ASSIGNMENTS</option>
          </select>
        </tr>
        <br />
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-display-grade-as">Display Grade as</label>
          </td>
          <select id="wd-display-grade-as">
            <option>Percentage</option>
          </select>
        </tr>
        <br />
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-submission-type">Submission Type</label>
          </td>
          <select id="wd-submission-type">
            <option>Online</option>
          </select>
        </tr>
        <br />
        <tr>
          <td></td>
          <label>Online Entry Options</label>
          <br />
          <input type="checkbox" id="wd-text-entry" />
          <label htmlFor="wd-text-entry">Text Entry</label>
          <br />
          <input type="checkbox" id="wd-website-url" />
          <label htmlFor="wd-website-url">Website URL</label>
          <br />
          <input type="checkbox" id="wd-media-recordings" />
          <label htmlFor="wd-media-recordings">Media Recordings</label>
          <br />
          <input type="checkbox" id="wd-student-annotation" />
          <label htmlFor="wd-student-annotation">Student Annotations</label>
          <br />
          <input type="checkbox" id="wd-file-upload" />
          <label htmlFor="wd-file-upload">File Upload</label>
        </tr>
        <br />
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-assign-to">Assign</label>
          </td>
          <td>
            <label htmlFor="wd-assign-to">Assign To</label>
            <br />
            <input id="wd-assign-to" value={"Everyone"} />
          </td>
        </tr>
        <br />
        <tr>
          <td></td>
          <label htmlFor="wd-due-date">Due</label>
          <br />
          <input
            type="date"
            id="wd-due-date"
            value="2024-05-13"
            min="2018-01-01"
            max="2026-12-31"
          />
        </tr>
        <br />
        <tr>
          <td></td>
          <table>
            <tr>
              <td>
                <label htmlFor="wd-available-from">Available from</label>
                <br />
                <input
                  type="date"
                  id="wd-available-from"
                  value="2024-05-06"
                  min="2018-01-01"
                  max="2026-12-31"
                />
              </td>
              <td>
                <label htmlFor="wd-available-until">Until</label>
                <br />
                <input
                  type="date"
                  id="wd-available-until"
                  value="2024-05-20"
                  min="2018-01-01"
                  max="2026-12-31"
                />
              </td>
            </tr>
          </table>
        </tr>
      </table>
      <hr />
      <div style={{ textAlign: "right" }}>
        <button>Cancel</button>
        <span> </span>
        <button>Save</button>
      </div>
    </div>
  );
}
