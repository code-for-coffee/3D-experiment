import React from "react";
import {
  AmbientLight,
  asset,
  AppRegistry,
  PointLight,
  NativeModules,
  View
} from "react-360";

import Entity from "Entity";
const { AudioModule } = NativeModules;

AudioModule.playEnvironmental({
  source: asset("02madeit.mp3"),
  volume: 0.7
});

export default class React3DView extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    dinosaurPosition: 40,
    earthRotation: 0
  };

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({ dinosaurPosition: this.state.dinosaurPosition + 1 });
      this.setState({ earthRotation: this.state.earthRotation + 1 });
    }, 1);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { dinosaurPosition, earthRotation } = this.state;

    return (
      <View>
        <AmbientLight intensity={5} />
        <PointLight
          style={{ color: "green", transform: [{ translate: [0, 0, 0] }] }}
        />
        <Entity
          source={{
            obj: asset("earth_ball.obj"),
            mtl: asset("earth_ball.mtl")
          }}
          lit={true}
          style={{
            color: "#FFF",
            transform: [
              { translate: [0, 0, -40] },
              { rotateY: earthRotation },
              { scale: 0.25 }
            ]
          }}
        />
        <Entity
          source={{ obj: asset("mokele.obj"), mtl: asset("mokele.mtl") }}
          lit={true}
          style={{
            color: "#FFF",
            transform: [
              { translate: [0, 0, -200] },
              { rotateZ: dinosaurPosition },
              { rotateY: dinosaurPosition },
              { scale: 0.9 }
            ]
          }}
        />
        <Entity
          source={{ obj: asset("mokele.obj"), mtl: asset("mokele.mtl") }}
          lit={true}
          style={{
            color: "#FFF",
            transform: [
              { translate: [0, 0, -200] },
              { rotateZ: dinosaurPosition * 2 },
              { rotateY: dinosaurPosition * 2 },
              { scale: 0.9 }
            ]
          }}
        />
      </View>
    );
  }
}

AppRegistry.registerComponent("React3DView", () => React3DView);
