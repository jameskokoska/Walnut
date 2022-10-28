import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import SearchResultContainer from "../../components/SearchResultContainer/SearchResultContainer";
import "./SearchResults.css";

const sampleCourse = {
  id: 0,
  Code: "ENGB29H3",
  Name: "Shakespeare and Film",
  Division: "University of Toronto Scarborough",
  "Course Description":
    "The history of Shakespeare and (on) film is long, illustriousŸ??and prolific: there have been at least 400 film and television adaptations and appropriations of Shakespeare over the past 120 years, from all over the world. But how and why do different film versions adapt Shakespeare? What are the implications of transposing a play by Shakespeare to a different country, era, or even language? What might these films reveal, illuminate, underscore, or re-imagine about Shakespeare, and why? In this course, we will explore several different Shakespearean adaptations together with the plays they adapt or appropriate. We will think carefully about the politics of adaptation and appropriation; about the global contexts and place of Shakespeare; and about the role of race, gender, sexuality, disability, empire and colonialism in our reception of Shakespeare on, and in, film.Pre-1900 course.",
  Department: "English (UTSC)",
  "Pre-requisites": "['ENGA11H3', 'ENGA10H3', 'ENGB70H3']",
  "Course Level": 2,
  "UTSC Breadth": "Arts, Literature & Language",
  "APSC Electives": "Complementary Studies",
  Campus: "Scarborough",
  Term: "['2022 Winter']",
  Activity:
    '[\'<table class="uif-tableCollectionLayout" id="u172">\\n<thead>\\n<tr>\\n<th class="infoline" colspan="1" rowspan="1" scope="col">\\n<span class="infoline" id="u202_c1_span">\\n<label for="" id="u202_c1">\\r\\nActivity\\r\\n</label>\\n</span>\\n</th>\\n<th class="infoline" colspan="1" rowspan="1" scope="col">\\n<span class="infoline" id="u202_c2_span">\\n<label for="" id="u202_c2">\\r\\nDay and Time\\r\\n</label>\\n</span>\\n</th>\\n<th class="infoline" colspan="1" rowspan="1" scope="col">\\n<span class="infoline" id="u202_c3_span">\\n<label for="" id="u202_c3">\\r\\nInstructor\\r\\n</label>\\n</span>\\n</th>\\n<th class="infoline" colspan="1" rowspan="1" scope="col">\\n<span class="infoline" id="u202_c4_span">\\n<label for="" id="u202_c4">\\r\\nLocation\\r\\n</label>\\n</span>\\n</th>\\n<th class="infoline" colspan="1" rowspan="1" scope="col">\\n<span class="infoline" id="u202_c5_span">\\n<label for="" id="u202_c5">\\r\\nClass Size\\r\\n</label>\\n</span>\\n</th>\\n<th class="infoline" colspan="1" rowspan="1" scope="col">\\n<span class="infoline" id="u202_c6_span">\\n<label for="" id="u202_c6">\\r\\nCurrent Enrolment\\r\\n</label>\\n</span>\\n</th>\\n<th class="infoline" colspan="1" rowspan="1" scope="col">\\n<span class="infoline" id="u202_c7_span">\\n<label for="" id="u202_c7">\\r\\nOption to Waitlist\\r\\n</label>\\n</span>\\n</th>\\n<th class="infoline" colspan="1" rowspan="1" scope="col">\\n<span class="infoline" id="u202_c8_span">\\n<label for="" id="u202_c8">\\r\\nDelivery Mode\\r\\n</label>\\n</span>\\n</th>\\n</tr>\\n</thead>\\n<tbody>\\n<tr>\\n<td class="uif-field" colspan="1" role="presentation" rowspan="1">\\n<div class="uif-field" id="u245_line0">\\n<span id="u245_line0">\\r\\nLec 01\\r\\n</span>\\n<!-- placeholder for dynamic field markers -->\\n<span id="u245_line0_markers"></span>\\n<span id="u245_line0_info_message"></span>\\n</div>\\n</td>\\n<td class="uif-field" colspan="1" role="presentation" rowspan="1">\\n<div class="uif-field" id="u254_line0">\\n<span id="u254_line0">\\r\\nMONDAY 11:00-14:00 <br/>\\n</span>\\n<!-- placeholder for dynamic field markers -->\\n<span id="u254_line0_markers"></span>\\n<span id="u254_line0_info_message"></span>\\n</div>\\n</td>\\n<td class="uif-field" colspan="1" role="presentation" rowspan="1">\\n<div class="uif-field" id="u263_line0">\\n<span id="u263_line0">\\r\\nU Chakravarty <br/>\\n</span>\\n<!-- placeholder for dynamic field markers -->\\n<span id="u263_line0_markers"></span>\\n<span id="u263_line0_info_message"></span>\\n</div>\\n</td>\\n<td class="uif-field" colspan="1" role="presentation" rowspan="1">\\n<div class="uif-field" id="u272_line0">\\n<span id="u272_line0">\\r\\nSW 128 <br/>\\n</span>\\n<!-- placeholder for dynamic field markers -->\\n<span id="u272_line0_markers"></span>\\n<span id="u272_line0_info_message"></span>\\n</div>\\n</td>\\n<td class="uif-field" colspan="1" role="presentation" rowspan="1">\\n<div class="uif-field" id="u281_line0">\\n<span id="u281_line0">\\r\\n100\\r\\n</span>\\n<!-- placeholder for dynamic field markers -->\\n<span id="u281_line0_markers"></span>\\n<span id="u281_line0_info_message"></span>\\n</div>\\n</td>\\n<td class="uif-field" colspan="1" role="presentation" rowspan="1">\\n<div class="uif-field" id="u290_line0">\\n<span id="u290_line0">\\r\\n3\\r\\n</span>\\n<!-- placeholder for dynamic field markers -->\\n<span id="u290_line0_markers"></span>\\n<span id="u290_line0_info_message"></span>\\n</div>\\n</td>\\n<td class="uif-field uif-fieldGroup uif-horizontalFieldGroup" colspan="1" role="presentation" rowspan="1">\\n<div class="uif-field uif-fieldGroup uif-horizontalFieldGroup" data-group="u302_line0" data-parent="Activity-details" id="u299_line0">\\n<fieldset aria-labelledby="u299_line0_label" id="u299_line0_fieldset">\\n<legend style="display: none"></legend>\\n<div class="uif-group uif-boxGroup uif-horizontalBoxGroup" data-parent="u299_line0" id="u302_line0">\\n<div class="uif-validationMessages uif-groupValidationMessages" data-messagesfor="u302_line0" id="u304_line0" style="display: none;">\\n</div>\\n<div class="uif-boxLayout uif-horizontalBoxLayout clearfix" id="u303_line0_boxLayout">\\n<div class="uif-field uif-imageField uif-boxLayoutHorizontalItem uif-boxLayoutHorizontalItem" id="u305_line0" style=";">\\n<img alt="" class="uif-image" id="u308_line0" src="../courseSearch/images/checkmark.png"/>\\n</div>\\n<input data-for="u305_line0" data-role="script" name="script" type="hidden" value="createTooltip(\\\'u305_line0\\\', \\\'Students have the option to waitlist for this course if filled\\\', {position:\\\'top\\\',align:\\\'left\\\',alwaysVisible:false,tail:{ align:\\\'left\\\', hidden: false },themePath:\\\'../krad/plugins/tooltip/jquerybubblepopup-theme/\\\',themeName:\\\'black\\\',selectable:true}, true, false);">\\n<input data-for="u305_line0" data-role="script" name="script" type="hidden" value="addAttribute(\\\'u305_line0\\\', \\\'class\\\', \\\'uif-tooltip\\\', true);">\\n</input></input></div>\\n</div>\\n<input data-for="u302_line0" data-role="dataScript" name="script" type="hidden" value="jQuery(\\\'#u302_line0\\\').data(\\\'validationMessages\\\', {summarize:true,displayMessages:true,collapseFieldMessages:true,displayLabel:true,hasOwnMessages:false,pageLevel:false,forceShow:true,sections:[],order:[],serverErrors:[],serverWarnings:[],serverInfo:[]});">\\n</input></fieldset>\\n</div>\\n</td>\\n<td class="uif-field" colspan="1" role="presentation" rowspan="1">\\n<div class="uif-field" id="u314_line0">\\n<span id="u314_line0">\\r\\nINPER\\r\\n</span>\\n<!-- placeholder for dynamic field markers -->\\n<span id="u314_line0_markers"></span>\\n<span id="u314_line0_info_message"></span>\\n</div>\\n</td>\\n</tr>\\n</tbody>\\n</table>\']',
  "Last updated": "15:03.0",
  Exclusion: [],
  "UTM Distribution": "",
  Corequisite: [],
  "Recommended Preparation": [],
  "Arts and Science Breadth": "",
  "Arts and Science Distribution": "",
  "Later term course details": "",
  Course: "<a href=/course/ENGB29H3>ENGB29H3</a>",
  FASEAvailable: "FALSE",
  MaybeRestricted: "FALSE",
  MajorsOutcomes: [],
  MinorsOutcomes: [],
  AIPreReqs: [],
};

export default function SearchResults() {
  const [searchParams] = useSearchParams();

  const searchTerm = searchParams.get("term");
  const [results, setResults] = useState([
    sampleCourse,
    sampleCourse,
    sampleCourse,
    sampleCourse,
    sampleCourse,
    sampleCourse,
  ]);

  return (
    <div className="search-results-page">
      <h2>Search Results</h2>
      <h3>{`${results.length} results for "${searchTerm}"`}</h3>
      <div className="search-results-list">
        {results.map((result) => {
          return (
            <SearchResultContainer
              course={result}
              searchTerm={searchTerm}
              numberResults={results.length}
            />
          );
        })}
      </div>
    </div>
  );
}
