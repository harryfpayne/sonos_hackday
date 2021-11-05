import React from "react";
import {Button} from "@kitt-technology/ui-core"

export default function Index() {
    return (
      <div className={"container mx-auto"}>
          <Button colorScheme={"primary"}>Start party mode</Button>

          <Button>Stop party mode</Button>
          <div>
              <h2>Current queue</h2>
              <div>song</div>
              <div>song</div>
              <div>song</div>
              <input /><button>Add song</button>
              <button>Clear songs</button>
          </div>
      </div>
    )
}
