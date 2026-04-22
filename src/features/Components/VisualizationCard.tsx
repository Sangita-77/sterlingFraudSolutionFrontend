import { useState } from 'react'
import './IndexComponents.css'
import TreeStructure from '../../assets/images/visualization/TreeStructure.png'
import Sliders from '../../assets/images/visualization/SlidersHorizontal.png'
import Export from '../../assets/images/visualization/Export.png'
import CaretUp from '../../assets/images/visualization/CaretUp.png'
import CaretDown from '../../assets/images/visualization/CaretDown.png'
import Search from '../../assets/images/Search.svg'
import Info from '../../assets/images/visualization/Info.svg'
import ArrowRight from '../../assets/images/visualization/ArrowRight.svg'
import ArrowLeft from '../../assets/images/visualization/ArrowArcLeft.svg'
import ArrowArcRight from '../../assets/images/visualization/ArrowArcRight.svg'
import ArrowArcLeft from '../../assets/images/visualization/ArrowArcLeft.svg'



const VisualizationCard = () => {
      const [showDetails, setShowDetails] = useState(true)
  const [showObjectDetails, setShowObjectDetails] = useState(true)
  const [minimize, setMinimize] = useState(true)

  const handleClick = (action: string) => {
    console.log(`${action} clicked`)
  }
  return (
     <div className='sideCard'>
        <div className='sideCardHead'>
          <span>
            <img src={TreeStructure} className='SideCardIcons' onClick={() => handleClick("Tree")} />
          </span>

          <p>Visualization</p>

          <span>
            <img src={Sliders} onClick={() => setMinimize(!minimize)} />
          </span>

          <span className='flagTag'>new</span>
          <span>
            <img src={Export} onClick={() => handleClick("Export")} />
          </span>
        </div>
        {minimize && (
          <>
            <div className='visualizationDetails'>
              <p className='textGray'>Visualization Details</p>
              <img src={showDetails ? CaretUp : CaretDown} onClick={() => setShowDetails(!showDetails)} />
            </div>
            {showDetails && (
              <>
                <div className='Details'>
                  Items: 5 out of 200
                </div>
              </>
            )}

            <div className='SeachObjectCrad'>
              <div className='Details'>Search and add Object</div>

              <div className='inputBox'>
                <img src={Search} width={24} />
                <input
                  type="text"
                  placeholder='Address Or TX'
                  onChange={(e) => console.log(e.target.value)}
                />
              </div>
            </div>

            <div className='visualizationDetails'>
              <p className='addObjects'>Add Objects (1)</p>
              <img src={showObjectDetails ? CaretUp : CaretDown} onClick={() => setShowObjectDetails(!showObjectDetails)} />
            </div>

            {/* Controls */}
            {showObjectDetails && (
              <>
                <div className='ObjectDetails' >
                  <div className='ObjectD'>
                    <span>
                      Time Step <img src={Info} width={24} onClick={() => handleClick("Info")} />
                    </span>
                  </div>

                  <div className='ClickAbeIcon'>
                    <img src={ArrowLeft} onClick={() => handleClick("Step Back")} />
                    <img src={ArrowRight} onClick={() => handleClick("Step Forward")} />
                  </div>
                </div>

                <div className='ObjectDetails'>
                  <div className='ObjectD'>
                    <span>
                      Time Step <img src={Info} width={24} onClick={() => handleClick("Info")} />
                    </span>
                  </div>

                  <div className='ClickAbeIcon'>
                    <img src={ArrowArcLeft} onClick={() => handleClick("Loop Back")} />
                    <img src={ArrowArcRight} onClick={() => handleClick("Loop Forward")} />
                  </div>
                </div>
              </>
            )}
          </>

        )}

      </div>
  )
}

export default VisualizationCard