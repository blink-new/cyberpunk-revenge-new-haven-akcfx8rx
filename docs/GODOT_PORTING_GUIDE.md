# Cyberpunk Revenge: Godot C++ Porting Guide

This document provides a comprehensive guide for porting the TypeScript/React codebase to Godot using C++/GDScript.

## Architecture Overview

The codebase has been designed with modularity and C++ porting in mind. The core systems are separated into distinct modules that can be easily translated to Godot's architecture.

### Core Systems

1. **GameEngine** (`src/core/GameEngine.ts`) - Main engine loop and entity management
2. **GameComponents** (`src/core/GameComponents.ts`) - Component data structures
3. **GameConstants** (`src/core/GameConstants.ts`) - Configuration and constants
4. **AbilitySystem** (`src/core/AbilitySystem.ts`) - Skill and ability management
5. **LevelSystem** (`src/core/LevelSystem.ts`) - Level generation and management
6. **GameManager** (`src/core/GameManager.ts`) - Central game coordinator

## Godot Project Structure

```
cyberpunk_revenge/
├── scenes/
│   ├── Main.tscn
│   ├── Player.tscn
│   ├── Enemy.tscn
│   ├── Level.tscn
│   └── UI/
│       ├── HUD.tscn
│       ├── PauseMenu.tscn
│       └── SkillTree.tscn
├── scripts/
│   ├── core/
│   │   ├── GameEngine.gd
│   │   ├── GameManager.gd
│   │   ├── AbilitySystem.gd
│   │   └── LevelSystem.gd
│   ├── components/
│   │   ├── PhysicsComponent.gd
│   │   ├── CombatComponent.gd
│   │   ├── AIComponent.gd
│   │   └── PlayerComponent.gd
│   ├── entities/
│   │   ├── Player.gd
│   │   ├── Enemy.gd
│   │   └── Projectile.gd
│   └── ui/
│       ├── HUD.gd
│       └── PauseMenu.gd
├── resources/
│   ├── characters/
│   ├── abilities/
│   ├── levels/
│   └── equipment/
└── assets/
    ├── sprites/
    ├── audio/
    └── shaders/
```

## Component System Translation

### TypeScript Component → Godot Resource

```typescript
// TypeScript
interface PhysicsComponent {
  velocity: Vector2;
  acceleration: Vector2;
  maxSpeed: number;
  friction: number;
  useGravity: boolean;
  onGround: boolean;
  mass: number;
}
```

```gdscript
# Godot GDScript Resource
class_name PhysicsComponent
extends Resource

@export var velocity: Vector2 = Vector2.ZERO
@export var acceleration: Vector2 = Vector2.ZERO
@export var max_speed: float = 300.0
@export var friction: float = 0.8
@export var use_gravity: bool = true
@export var on_ground: bool = false
@export var mass: float = 1.0
```

### C++ Alternative (GDExtension)

```cpp
// C++ Header
#ifndef PHYSICS_COMPONENT_H
#define PHYSICS_COMPONENT_H

#include <godot_cpp/classes/resource.hpp>
#include <godot_cpp/variant/vector2.hpp>

using namespace godot;

class PhysicsComponent : public Resource {
    GDCLASS(PhysicsComponent, Resource)

private:
    Vector2 velocity = Vector2(0, 0);
    Vector2 acceleration = Vector2(0, 0);
    float max_speed = 300.0f;
    float friction = 0.8f;
    bool use_gravity = true;
    bool on_ground = false;
    float mass = 1.0f;

protected:
    static void _bind_methods();

public:
    PhysicsComponent();
    ~PhysicsComponent();

    // Getters and Setters
    Vector2 get_velocity() const { return velocity; }
    void set_velocity(const Vector2& p_velocity) { velocity = p_velocity; }
    
    Vector2 get_acceleration() const { return acceleration; }
    void set_acceleration(const Vector2& p_acceleration) { acceleration = p_acceleration; }
    
    float get_max_speed() const { return max_speed; }
    void set_max_speed(float p_max_speed) { max_speed = p_max_speed; }
    
    float get_friction() const { return friction; }
    void set_friction(float p_friction) { friction = p_friction; }
    
    bool get_use_gravity() const { return use_gravity; }
    void set_use_gravity(bool p_use_gravity) { use_gravity = p_use_gravity; }
    
    bool get_on_ground() const { return on_ground; }
    void set_on_ground(bool p_on_ground) { on_ground = p_on_ground; }
    
    float get_mass() const { return mass; }
    void set_mass(float p_mass) { mass = p_mass; }
};

#endif // PHYSICS_COMPONENT_H
```

## System Translation Examples

### 1. Game Engine → Godot Main Scene

```gdscript
# GameEngine.gd
class_name GameEngine
extends Node

signal entity_created(entity: GameEntity)
signal entity_destroyed(entity_id: String)

var entities: Dictionary = {}
var systems: Dictionary = {}
var delta_time: float = 0.0
var is_running: bool = false

func _ready():
    initialize_systems()

func initialize_systems():
    systems["physics"] = PhysicsSystem.new()
    systems["collision"] = CollisionSystem.new()
    systems["combat"] = CombatSystem.new()
    systems["ai"] = AISystem.new()
    systems["animation"] = AnimationSystem.new()
    
    add_child(systems["physics"])
    add_child(systems["collision"])
    add_child(systems["combat"])
    add_child(systems["ai"])
    add_child(systems["animation"])

func _process(delta):
    if not is_running:
        return
        
    delta_time = delta
    update_systems(delta)

func update_systems(delta: float):
    for system in systems.values():
        if system.has_method("update"):
            system.update(delta, entities)

func create_entity(id: String, transform: Transform2D, bounds: Rect2) -> GameEntity:
    var entity = GameEntity.new()
    entity.id = id
    entity.transform = transform
    entity.bounds = bounds
    entity.active = true
    
    entities[id] = entity
    entity_created.emit(entity)
    return entity

func destroy_entity(id: String):
    if entities.has(id):
        entities.erase(id)
        entity_destroyed.emit(id)

func get_entity(id: String) -> GameEntity:
    return entities.get(id, null)

func get_entities_with_component(component_type: String) -> Array[GameEntity]:
    var result: Array[GameEntity] = []
    for entity in entities.values():
        if entity.has_component(component_type):
            result.append(entity)
    return result
```

### 2. Physics System Translation

```gdscript
# PhysicsSystem.gd
class_name PhysicsSystem
extends Node

const GRAVITY = 0.8
const TERMINAL_VELOCITY = 20.0

func update(delta: float, entities: Dictionary):
    for entity in entities.values():
        var physics_comp = entity.get_component("physics")
        if not physics_comp:
            continue
            
        # Apply gravity
        if not physics_comp.on_ground and physics_comp.use_gravity:
            physics_comp.velocity.y += GRAVITY
            physics_comp.velocity.y = min(physics_comp.velocity.y, TERMINAL_VELOCITY)
        
        # Apply friction
        if physics_comp.on_ground:
            physics_comp.velocity.x *= physics_comp.friction
        
        # Update position
        entity.transform.origin += physics_comp.velocity * delta * 60.0
        
        # Update bounds
        entity.bounds.position = entity.transform.origin
```

### 3. Ability System Translation

```gdscript
# AbilitySystem.gd
class_name AbilitySystem
extends Node

var abilities: Dictionary = {}
var cooldowns: Dictionary = {}

func _ready():
    initialize_abilities()

func initialize_abilities():
    # Samurai abilities
    register_ability({
        "id": "sam_basic_slash",
        "name": "Basic Slash",
        "description": "A quick sword strike",
        "icon": "⚔️",
        "type": "attacking",
        "tier": 1,
        "max_level": 5,
        "mana_cost": 10,
        "cooldown": 1.0,
        "cast_time": 0.2,
        "range": 80,
        "damage": 30,
        "effects": [
            {
                "type": "damage",
                "value": 30,
                "target": "enemy"
            }
        ]
    })

func register_ability(ability_data: Dictionary):
    abilities[ability_data.id] = ability_data

func use_ability(ability_id: String, caster: GameEntity, target: GameEntity = null) -> bool:
    var ability = abilities.get(ability_id)
    if not ability:
        return false
    
    var combat = caster.get_component("combat")
    if not combat:
        return false
    
    # Check mana cost
    if combat.mana < ability.mana_cost:
        return false
    
    # Check cooldown
    if cooldowns.has(ability_id) and cooldowns[ability_id] > 0:
        return false
    
    # Consume mana
    combat.mana -= ability.mana_cost
    
    # Set cooldown
    cooldowns[ability_id] = ability.cooldown
    
    # Execute effects
    execute_ability_effects(ability, caster, target)
    
    return true

func execute_ability_effects(ability: Dictionary, caster: GameEntity, target: GameEntity):
    for effect in ability.effects:
        match effect.type:
            "damage":
                if target:
                    deal_damage(caster, target, effect.value)
            "heal":
                heal_entity(target if target else caster, effect.value)
            "buff":
                apply_status_effect(target if target else caster, effect)

func update_cooldowns(delta: float):
    for ability_id in cooldowns.keys():
        cooldowns[ability_id] -= delta
        if cooldowns[ability_id] <= 0:
            cooldowns.erase(ability_id)
```

## Constants Translation

```gdscript
# GameConstants.gd
class_name GameConstants
extends RefCounted

# Core Engine Settings
const TARGET_FPS = 60
const FIXED_TIMESTEP = 1.0 / 60.0
const MAX_DELTA_TIME = 0.05

# World Settings
const WORLD_WIDTH = 2000
const WORLD_HEIGHT = 600
const TILE_SIZE = 32
const GRAVITY = 0.8
const TERMINAL_VELOCITY = 20

# Player Settings
const PLAYER_WIDTH = 48
const PLAYER_HEIGHT = 64
const PLAYER_SPEED = 4
const JUMP_FORCE = 18
const DOUBLE_JUMP_FORCE = 15

# Character Classes
const CHARACTER_CLASSES = {
    "SAMURAI": {
        "BASE_HEALTH": 120,
        "BASE_MANA": 80,
        "BASE_DAMAGE": 30,
        "BASE_DEFENSE": 15,
        "BASE_SPEED": 100
    },
    "NINJA": {
        "BASE_HEALTH": 90,
        "BASE_MANA": 100,
        "BASE_DAMAGE": 25,
        "BASE_DEFENSE": 8,
        "BASE_SPEED": 140
    }
    # ... more classes
}

# Colors
const COLORS = {
    "PRIMARY": Color("#8b5cf6"),
    "SECONDARY": Color("#a855f7"),
    "HEALTH": Color("#dc2626"),
    "MANA": Color("#3b82f6"),
    "EPIC_COLOR": Color("#a855f7"),
    "LEGENDARY_COLOR": Color("#f97316"),
    "ULTIMATE_COLOR": Color("#ef4444")
}

static func get_character_base_stats(character_class: String) -> Dictionary:
    return CHARACTER_CLASSES.get(character_class, {})

static func get_experience_required(level: int) -> int:
    return int(100 * pow(1.1, level - 1))
```

## Entity System in Godot

### GameEntity Class

```gdscript
# GameEntity.gd
class_name GameEntity
extends Node2D

var id: String
var active: bool = true
var components: Dictionary = {}

func add_component(component_type: String, component: Resource):
    components[component_type] = component

func remove_component(component_type: String):
    components.erase(component_type)

func get_component(component_type: String) -> Resource:
    return components.get(component_type, null)

func has_component(component_type: String) -> bool:
    return components.has(component_type)

func get_all_components() -> Dictionary:
    return components
```

## Level System Translation

```gdscript
# LevelSystem.gd
class_name LevelSystem
extends Node

var levels: Dictionary = {}
var current_level: LevelData = null

func _ready():
    generate_all_levels()

func generate_all_levels():
    for i in range(1, 101):  # 100 levels
        var level_data = generate_level(i)
        levels[i] = level_data

func generate_level(level_id: int) -> LevelData:
    var level_data = LevelData.new()
    level_data.id = level_id
    level_data.name = generate_level_name(level_id)
    level_data.environment = get_environment_for_level(level_id)
    level_data.difficulty = get_difficulty_for_level(level_id)
    level_data.is_boss_level = level_id % 5 == 0
    level_data.enemies = generate_enemies(level_id)
    level_data.platforms = generate_platforms(level_id)
    level_data.pickups = generate_pickups(level_id)
    
    return level_data

func load_level(level_id: int) -> bool:
    var level = levels.get(level_id)
    if not level:
        return false
    
    current_level = level
    return true
```

## Input System Translation

```gdscript
# InputManager.gd
class_name InputManager
extends Node

signal input_action(action: String, pressed: bool)

var input_map = {
    KEY_A: "move_left",
    KEY_D: "move_right",
    KEY_W: "move_up",
    KEY_S: "move_down",
    KEY_SPACE: "jump",
    KEY_X: "attack",
    KEY_SHIFT: "dash",
    KEY_1: "ability_0",
    KEY_2: "ability_1",
    KEY_3: "ability_2",
    KEY_4: "ability_3",
    KEY_5: "ability_4",
    KEY_6: "ability_5"
}

func _input(event):
    if event is InputEventKey:
        var keycode = event.keycode
        if input_map.has(keycode):
            var action = input_map[keycode]
            input_action.emit(action, event.pressed)
```

## Performance Considerations

### 1. Object Pooling

```gdscript
# ObjectPool.gd
class_name ObjectPool
extends Node

var pools: Dictionary = {}

func get_object(type: String) -> Node:
    if not pools.has(type):
        pools[type] = []
    
    var pool = pools[type]
    if pool.is_empty():
        return create_new_object(type)
    else:
        return pool.pop_back()

func return_object(type: String, obj: Node):
    if not pools.has(type):
        pools[type] = []
    
    obj.reset()  # Assuming objects have a reset method
    pools[type].append(obj)

func create_new_object(type: String) -> Node:
    match type:
        "projectile":
            return preload("res://scenes/Projectile.tscn").instantiate()
        "enemy":
            return preload("res://scenes/Enemy.tscn").instantiate()
        _:
            return Node.new()
```

### 2. Spatial Partitioning

```gdscript
# SpatialGrid.gd
class_name SpatialGrid
extends RefCounted

var grid_size: int = 100
var grid: Dictionary = {}

func add_entity(entity: GameEntity):
    var grid_pos = world_to_grid(entity.global_position)
    if not grid.has(grid_pos):
        grid[grid_pos] = []
    grid[grid_pos].append(entity)

func remove_entity(entity: GameEntity):
    var grid_pos = world_to_grid(entity.global_position)
    if grid.has(grid_pos):
        grid[grid_pos].erase(entity)

func get_nearby_entities(position: Vector2, radius: float) -> Array:
    var nearby = []
    var min_grid = world_to_grid(position - Vector2(radius, radius))
    var max_grid = world_to_grid(position + Vector2(radius, radius))
    
    for x in range(min_grid.x, max_grid.x + 1):
        for y in range(min_grid.y, max_grid.y + 1):
            var grid_pos = Vector2i(x, y)
            if grid.has(grid_pos):
                nearby.append_array(grid[grid_pos])
    
    return nearby

func world_to_grid(world_pos: Vector2) -> Vector2i:
    return Vector2i(int(world_pos.x / grid_size), int(world_pos.y / grid_size))
```

## Asset Pipeline

### 1. Sprite Animation

```gdscript
# AnimationController.gd
class_name AnimationController
extends Node

@onready var sprite: AnimatedSprite2D = $AnimatedSprite2D
var current_animation: String = ""

func play_animation(animation_name: String, force: bool = false):
    if current_animation == animation_name and not force:
        return
    
    current_animation = animation_name
    sprite.play(animation_name)

func set_animation_speed(speed: float):
    sprite.speed_scale = speed

func is_animation_finished() -> bool:
    return not sprite.is_playing()
```

### 2. Audio Management

```gdscript
# AudioManager.gd
class_name AudioManager
extends Node

var audio_players: Dictionary = {}
var sound_library: Dictionary = {}

func _ready():
    load_sound_library()

func load_sound_library():
    sound_library = {
        "player_jump": preload("res://assets/audio/player_jump.ogg"),
        "player_attack": preload("res://assets/audio/player_attack.ogg"),
        "enemy_death": preload("res://assets/audio/enemy_death.ogg"),
        "level_complete": preload("res://assets/audio/level_complete.ogg")
    }

func play_sound(sound_id: String, volume: float = 1.0, pitch: float = 1.0):
    if not sound_library.has(sound_id):
        return
    
    var audio_player = AudioStreamPlayer.new()
    add_child(audio_player)
    
    audio_player.stream = sound_library[sound_id]
    audio_player.volume_db = linear_to_db(volume)
    audio_player.pitch_scale = pitch
    audio_player.play()
    
    # Clean up after playing
    audio_player.finished.connect(func(): audio_player.queue_free())
```

## Migration Checklist

### Phase 1: Core Systems
- [ ] Set up Godot project structure
- [ ] Implement GameEntity and Component system
- [ ] Port GameConstants
- [ ] Implement basic PhysicsSystem
- [ ] Implement CollisionSystem

### Phase 2: Game Logic
- [ ] Port AbilitySystem
- [ ] Implement CombatSystem
- [ ] Port LevelSystem
- [ ] Implement AISystem
- [ ] Create GameManager

### Phase 3: Entities
- [ ] Create Player scene and script
- [ ] Create Enemy scenes and scripts
- [ ] Implement Projectile system
- [ ] Create Platform system

### Phase 4: UI and Polish
- [ ] Port UI components
- [ ] Implement HUD
- [ ] Create menus (Pause, Skills, Inventory)
- [ ] Add visual effects and particles
- [ ] Implement audio system

### Phase 5: Content
- [ ] Create all 100 levels
- [ ] Implement all 7 character classes
- [ ] Create complete skill trees (100 skills per class)
- [ ] Implement equipment system
- [ ] Add all visual and audio assets

## Best Practices for Porting

1. **Start Small**: Begin with core systems and gradually add complexity
2. **Test Frequently**: Ensure each system works before moving to the next
3. **Use Godot's Strengths**: Leverage Godot's built-in systems (physics, animation, etc.)
4. **Maintain Architecture**: Keep the modular design for easier maintenance
5. **Performance First**: Use object pooling and spatial partitioning from the start
6. **Document Changes**: Keep track of differences between TypeScript and Godot versions

## Conclusion

This modular architecture makes the codebase highly portable to Godot. The separation of concerns, component-based design, and clear interfaces ensure that each system can be ported independently while maintaining the overall game structure and functionality.

The TypeScript version serves as a complete reference implementation that can guide the C++/GDScript development process, ensuring feature parity and consistent behavior across platforms.