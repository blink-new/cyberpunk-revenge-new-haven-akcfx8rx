// Ability System - Complete skill and ability management
// Modular design for easy C++ porting

import { GameEntity, Vector2 } from './GameEngine';
import { AbilityComponent, AbilityEffect, StatusEffect } from './GameComponents';
import { GAME_CONFIG, COLORS } from './GameConstants';

export interface Ability {
  id: string;
  name: string;
  description: string;
  icon: string;
  type: 'active' | 'passive' | 'attacking' | 'defensive' | 'magic' | 'ultimate';
  tier: number;
  maxLevel: number;
  manaCost: number;
  cooldown: number;
  castTime: number;
  channelTime: number;
  range: number;
  areaOfEffect: number;
  damage: number;
  effects: AbilityEffect[];
  requirements: AbilityRequirement[];
  scaling: AbilityScaling;
  animation?: string;
  sound?: string;
  particles?: string;
}

export interface AbilityRequirement {
  type: 'level' | 'skill' | 'stat' | 'quest' | 'item';
  value: number | string;
  operator?: '==' | '!=' | '>' | '<' | '>=' | '<=';
}

export interface AbilityScaling {
  damagePerLevel: number;
  cooldownReductionPerLevel: number;
  manaCostReductionPerLevel: number;
  rangeIncreasePerLevel: number;
}

export interface AbilityInstance {
  abilityId: string;
  level: number;
  cooldown: number;
  charges: number;
  experience: number;
}

export class AbilitySystem {
  private abilities: Map<string, Ability> = new Map();
  private activeEffects: Map<string, any[]> = new Map();
  private cooldowns: Map<string, number> = new Map();

  constructor() {
    this.initializeAbilities();
  }

  private initializeAbilities(): void {
    // Samurai Abilities
    this.registerAbility({
      id: 'sam_basic_slash',
      name: 'Basic Slash',
      description: 'A quick sword strike',
      icon: '⚔️',
      type: 'attacking',
      tier: 1,
      maxLevel: 5,
      manaCost: 10,
      cooldown: 1.0,
      castTime: 0.2,
      channelTime: 0,
      range: 80,
      areaOfEffect: 0,
      damage: 30,
      effects: [
        {
          type: 'damage',
          value: 30,
          duration: 0,
          target: 'enemy',
          animation: 'slash',
          sound: 'sword_slash',
          particles: 'slash_effect'
        }
      ],
      requirements: [{ type: 'level', value: 1 }],
      scaling: {
        damagePerLevel: 5,
        cooldownReductionPerLevel: 0.1,
        manaCostReductionPerLevel: 0,
        rangeIncreasePerLevel: 5
      }
    });

    this.registerAbility({
      id: 'sam_wind_slash',
      name: 'Wind Slash',
      description: 'Sends a cutting wind projectile',
      icon: '🌪️',
      type: 'attacking',
      tier: 2,
      maxLevel: 5,
      manaCost: 25,
      cooldown: 3.0,
      castTime: 0.5,
      channelTime: 0,
      range: 300,
      areaOfEffect: 0,
      damage: 45,
      effects: [
        {
          type: 'damage',
          value: 45,
          duration: 0,
          target: 'enemy',
          animation: 'wind_slash',
          sound: 'wind_slash',
          particles: 'wind_effect'
        }
      ],
      requirements: [{ type: 'level', value: 5 }, { type: 'skill', value: 'sam_basic_slash' }],
      scaling: {
        damagePerLevel: 8,
        cooldownReductionPerLevel: 0.2,
        manaCostReductionPerLevel: 1,
        rangeIncreasePerLevel: 20
      }
    });

    this.registerAbility({
      id: 'sam_reality_cut',
      name: 'Reality Cut',
      description: 'Cuts through the fabric of reality itself',
      icon: '🌌',
      type: 'ultimate',
      tier: 10,
      maxLevel: 1,
      manaCost: 100,
      cooldown: 60.0,
      castTime: 2.0,
      channelTime: 0,
      range: 500,
      areaOfEffect: 200,
      damage: 500,
      effects: [
        {
          type: 'damage',
          value: 500,
          duration: 0,
          target: 'all',
          animation: 'reality_cut',
          sound: 'reality_tear',
          particles: 'reality_distortion'
        }
      ],
      requirements: [{ type: 'level', value: 99 }],
      scaling: {
        damagePerLevel: 0,
        cooldownReductionPerLevel: 0,
        manaCostReductionPerLevel: 0,
        rangeIncreasePerLevel: 0
      }
    });

    // Ninja Abilities
    this.registerAbility({
      id: 'nin_shadow_strike',
      name: 'Shadow Strike',
      description: 'Strike from the shadows with increased critical chance',
      icon: '🗡️',
      type: 'attacking',
      tier: 1,
      maxLevel: 5,
      manaCost: 15,
      cooldown: 2.0,
      castTime: 0.1,
      channelTime: 0,
      range: 100,
      areaOfEffect: 0,
      damage: 35,
      effects: [
        {
          type: 'damage',
          value: 35,
          duration: 0,
          target: 'enemy',
          animation: 'shadow_strike',
          sound: 'shadow_strike',
          particles: 'shadow_effect'
        }
      ],
      requirements: [{ type: 'level', value: 1 }],
      scaling: {
        damagePerLevel: 6,
        cooldownReductionPerLevel: 0.15,
        manaCostReductionPerLevel: 1,
        rangeIncreasePerLevel: 10
      }
    });

    this.registerAbility({
      id: 'nin_stealth',
      name: 'Stealth',
      description: 'Become invisible to enemies',
      icon: '👤',
      type: 'active',
      tier: 1,
      maxLevel: 10,
      manaCost: 20,
      cooldown: 15.0,
      castTime: 0.5,
      channelTime: 0,
      range: 0,
      areaOfEffect: 0,
      damage: 0,
      effects: [
        {
          type: 'buff',
          value: 1,
          duration: 10,
          target: 'self',
          statusEffect: {
            type: 'stun', // Using stun as invisibility placeholder
            duration: 10,
            tickTimer: 0,
            stackCount: 1
          } as StatusEffect,
          animation: 'stealth',
          sound: 'stealth',
          particles: 'stealth_effect'
        }
      ],
      requirements: [{ type: 'level', value: 2 }],
      scaling: {
        damagePerLevel: 0,
        cooldownReductionPerLevel: 0.5,
        manaCostReductionPerLevel: 1,
        rangeIncreasePerLevel: 0
      }
    });

    // Mage Abilities
    this.registerAbility({
      id: 'mag_fireball',
      name: 'Fireball',
      description: 'Launches a ball of fire',
      icon: '🔥',
      type: 'magic',
      tier: 1,
      maxLevel: 5,
      manaCost: 25,
      cooldown: 2.5,
      castTime: 0.8,
      channelTime: 0,
      range: 250,
      areaOfEffect: 50,
      damage: 40,
      effects: [
        {
          type: 'damage',
          value: 40,
          duration: 0,
          target: 'area',
          statusEffect: {
            type: 'burn',
            duration: 5,
            damage: 5,
            tickTimer: 0.5,
            stackCount: 1
          } as StatusEffect,
          animation: 'fireball',
          sound: 'fireball',
          particles: 'fire_explosion'
        }
      ],
      requirements: [{ type: 'level', value: 1 }],
      scaling: {
        damagePerLevel: 7,
        cooldownReductionPerLevel: 0.2,
        manaCostReductionPerLevel: 2,
        rangeIncreasePerLevel: 15
      }
    });

    this.registerAbility({
      id: 'mag_meteor',
      name: 'Meteor',
      description: 'Calls down a meteor from the sky',
      icon: '☄️',
      type: 'magic',
      tier: 3,
      maxLevel: 5,
      manaCost: 80,
      cooldown: 10.0,
      castTime: 2.0,
      channelTime: 0,
      range: 400,
      areaOfEffect: 150,
      damage: 120,
      effects: [
        {
          type: 'damage',
          value: 120,
          duration: 0,
          target: 'area',
          animation: 'meteor',
          sound: 'meteor_impact',
          particles: 'meteor_explosion'
        }
      ],
      requirements: [{ type: 'level', value: 15 }, { type: 'skill', value: 'mag_fireball' }],
      scaling: {
        damagePerLevel: 20,
        cooldownReductionPerLevel: 0.5,
        manaCostReductionPerLevel: 5,
        rangeIncreasePerLevel: 25
      }
    });

    // Add more abilities for other classes...
    this.initializeWarriorAbilities();
    this.initializeHunterAbilities();
    this.initializeNecromancerAbilities();
    this.initializeDruidAbilities();
  }

  private initializeWarriorAbilities(): void {
    this.registerAbility({
      id: 'war_power_strike',
      name: 'Power Strike',
      description: 'A devastating melee attack',
      icon: '💥',
      type: 'attacking',
      tier: 1,
      maxLevel: 5,
      manaCost: 20,
      cooldown: 3.0,
      castTime: 0.5,
      channelTime: 0,
      range: 90,
      areaOfEffect: 0,
      damage: 50,
      effects: [
        {
          type: 'damage',
          value: 50,
          duration: 0,
          target: 'enemy',
          animation: 'power_strike',
          sound: 'heavy_hit',
          particles: 'impact_effect'
        }
      ],
      requirements: [{ type: 'level', value: 1 }],
      scaling: {
        damagePerLevel: 10,
        cooldownReductionPerLevel: 0.2,
        manaCostReductionPerLevel: 1,
        rangeIncreasePerLevel: 5
      }
    });

    this.registerAbility({
      id: 'war_berserker',
      name: 'Berserker Rage',
      description: 'Increases damage but reduces defense',
      icon: '😤',
      type: 'active',
      tier: 2,
      maxLevel: 3,
      manaCost: 40,
      cooldown: 20.0,
      castTime: 1.0,
      channelTime: 0,
      range: 0,
      areaOfEffect: 0,
      damage: 0,
      effects: [
        {
          type: 'buff',
          value: 1,
          duration: 15,
          target: 'self',
          statusEffect: {
            type: 'berserk',
            duration: 15,
            damageMultiplier: 1.5,
            tickTimer: 0,
            stackCount: 1
          } as StatusEffect,
          animation: 'berserker',
          sound: 'rage_roar',
          particles: 'rage_aura'
        }
      ],
      requirements: [{ type: 'level', value: 8 }],
      scaling: {
        damagePerLevel: 0,
        cooldownReductionPerLevel: 1.0,
        manaCostReductionPerLevel: 5,
        rangeIncreasePerLevel: 0
      }
    });
  }

  private initializeHunterAbilities(): void {
    this.registerAbility({
      id: 'hun_precise_shot',
      name: 'Precise Shot',
      description: 'Accurate ranged attack with high critical chance',
      icon: '🏹',
      type: 'attacking',
      tier: 1,
      maxLevel: 5,
      manaCost: 15,
      cooldown: 1.5,
      castTime: 0.3,
      channelTime: 0,
      range: 350,
      areaOfEffect: 0,
      damage: 35,
      effects: [
        {
          type: 'damage',
          value: 35,
          duration: 0,
          target: 'enemy',
          animation: 'arrow_shot',
          sound: 'bow_release',
          particles: 'arrow_trail'
        }
      ],
      requirements: [{ type: 'level', value: 1 }],
      scaling: {
        damagePerLevel: 6,
        cooldownReductionPerLevel: 0.1,
        manaCostReductionPerLevel: 1,
        rangeIncreasePerLevel: 20
      }
    });

    this.registerAbility({
      id: 'hun_explosive_arrow',
      name: 'Explosive Arrow',
      description: 'Arrow that explodes on impact',
      icon: '💥',
      type: 'attacking',
      tier: 2,
      maxLevel: 5,
      manaCost: 35,
      cooldown: 5.0,
      castTime: 0.8,
      channelTime: 0,
      range: 300,
      areaOfEffect: 80,
      damage: 60,
      effects: [
        {
          type: 'damage',
          value: 60,
          duration: 0,
          target: 'area',
          animation: 'explosive_arrow',
          sound: 'explosion',
          particles: 'explosion_effect'
        }
      ],
      requirements: [{ type: 'level', value: 10 }],
      scaling: {
        damagePerLevel: 10,
        cooldownReductionPerLevel: 0.3,
        manaCostReductionPerLevel: 2,
        rangeIncreasePerLevel: 15
      }
    });
  }

  private initializeNecromancerAbilities(): void {
    this.registerAbility({
      id: 'nec_bone_spear',
      name: 'Bone Spear',
      description: 'Piercing bone projectile',
      icon: '🦴',
      type: 'magic',
      tier: 1,
      maxLevel: 5,
      manaCost: 20,
      cooldown: 2.0,
      castTime: 0.6,
      channelTime: 0,
      range: 280,
      areaOfEffect: 0,
      damage: 38,
      effects: [
        {
          type: 'damage',
          value: 38,
          duration: 0,
          target: 'enemy',
          animation: 'bone_spear',
          sound: 'bone_crack',
          particles: 'bone_shards'
        }
      ],
      requirements: [{ type: 'level', value: 1 }],
      scaling: {
        damagePerLevel: 7,
        cooldownReductionPerLevel: 0.15,
        manaCostReductionPerLevel: 1,
        rangeIncreasePerLevel: 20
      }
    });

    this.registerAbility({
      id: 'nec_raise_skeleton',
      name: 'Raise Skeleton',
      description: 'Summons a skeleton warrior',
      icon: '💀',
      type: 'magic',
      tier: 1,
      maxLevel: 10,
      manaCost: 40,
      cooldown: 8.0,
      castTime: 1.5,
      channelTime: 0,
      range: 150,
      areaOfEffect: 0,
      damage: 0,
      effects: [
        {
          type: 'summon',
          value: 1,
          duration: 60,
          target: 'area',
          animation: 'raise_skeleton',
          sound: 'bone_rattle',
          particles: 'necromancy_circle'
        }
      ],
      requirements: [{ type: 'level', value: 3 }],
      scaling: {
        damagePerLevel: 0,
        cooldownReductionPerLevel: 0.3,
        manaCostReductionPerLevel: 2,
        rangeIncreasePerLevel: 10
      }
    });
  }

  private initializeDruidAbilities(): void {
    this.registerAbility({
      id: 'dru_heal',
      name: 'Nature\'s Heal',
      description: 'Healing power of nature',
      icon: '🌿',
      type: 'magic',
      tier: 1,
      maxLevel: 10,
      manaCost: 30,
      cooldown: 3.0,
      castTime: 1.0,
      channelTime: 0,
      range: 0,
      areaOfEffect: 0,
      damage: 0,
      effects: [
        {
          type: 'heal',
          value: 50,
          duration: 0,
          target: 'self',
          animation: 'nature_heal',
          sound: 'nature_magic',
          particles: 'healing_light'
        }
      ],
      requirements: [{ type: 'level', value: 1 }],
      scaling: {
        damagePerLevel: 8,
        cooldownReductionPerLevel: 0.2,
        manaCostReductionPerLevel: 2,
        rangeIncreasePerLevel: 0
      }
    });

    this.registerAbility({
      id: 'dru_wolf_form',
      name: 'Wolf Form',
      description: 'Transform into a wolf',
      icon: '🐺',
      type: 'active',
      tier: 1,
      maxLevel: 5,
      manaCost: 40,
      cooldown: 12.0,
      castTime: 1.0,
      channelTime: 0,
      range: 0,
      areaOfEffect: 0,
      damage: 0,
      effects: [
        {
          type: 'transform',
          value: 1,
          duration: 30,
          target: 'self',
          animation: 'wolf_transform',
          sound: 'wolf_howl',
          particles: 'transformation'
        }
      ],
      requirements: [{ type: 'level', value: 2 }],
      scaling: {
        damagePerLevel: 0,
        cooldownReductionPerLevel: 0.5,
        manaCostReductionPerLevel: 3,
        rangeIncreasePerLevel: 0
      }
    });
  }

  public registerAbility(ability: Ability): void {
    this.abilities.set(ability.id, ability);
  }

  public getAbility(abilityId: string): Ability | undefined {
    return this.abilities.get(abilityId);
  }

  public getAllAbilities(): Ability[] {
    return Array.from(this.abilities.values());
  }

  public getAbilitiesByClass(characterClass: string): Ability[] {
    const prefix = this.getClassPrefix(characterClass);
    return Array.from(this.abilities.values()).filter(ability => 
      ability.id.startsWith(prefix)
    );
  }

  public getAbilitiesByTier(tier: number): Ability[] {
    return Array.from(this.abilities.values()).filter(ability => 
      ability.tier === tier
    );
  }

  public getAbilitiesByType(type: string): Ability[] {
    return Array.from(this.abilities.values()).filter(ability => 
      ability.type === type
    );
  }

  private getClassPrefix(characterClass: string): string {
    const prefixes: { [key: string]: string } = {
      'samurai': 'sam_',
      'ninja': 'nin_',
      'warrior': 'war_',
      'hunter': 'hun_',
      'mage': 'mag_',
      'necromancer': 'nec_',
      'druid': 'dru_'
    };
    return prefixes[characterClass] || '';
  }

  public canUseAbility(
    abilityId: string, 
    caster: GameEntity, 
    currentMana: number, 
    learnedSkills: string[]
  ): boolean {
    const ability = this.getAbility(abilityId);
    if (!ability) return false;

    // Check if skill is learned
    if (!learnedSkills.includes(abilityId)) return false;

    // Check mana cost
    if (currentMana < ability.manaCost) return false;

    // Check cooldown
    const cooldown = this.cooldowns.get(abilityId) || 0;
    if (cooldown > 0) return false;

    // Check requirements
    return this.checkRequirements(ability, caster);
  }

  private checkRequirements(ability: Ability, caster: GameEntity): boolean {
    const player = caster.components.get('player');
    if (!player) return false;

    for (const requirement of ability.requirements) {
      switch (requirement.type) {
        case 'level':
          if (player.level < requirement.value) return false;
          break;
        case 'skill':
          if (!player.learnedSkills.includes(requirement.value as string)) return false;
          break;
        case 'stat':
          // Check specific stat requirements
          break;
      }
    }

    return true;
  }

  public useAbility(
    abilityId: string, 
    caster: GameEntity, 
    target?: GameEntity, 
    targetPosition?: Vector2
  ): boolean {
    const ability = this.getAbility(abilityId);
    if (!ability) return false;

    const combat = caster.components.get('combat');
    if (!combat) return false;

    // Check if ability can be used
    if (!this.canUseAbility(abilityId, caster, combat.mana, caster.components.get('player')?.learnedSkills || [])) {
      return false;
    }

    // Consume mana
    combat.mana -= ability.manaCost;

    // Set cooldown
    this.cooldowns.set(abilityId, ability.cooldown);

    // Execute ability effects
    this.executeAbilityEffects(ability, caster, target, targetPosition);

    return true;
  }

  private executeAbilityEffects(
    ability: Ability, 
    caster: GameEntity, 
    target?: GameEntity, 
    targetPosition?: Vector2
  ): void {
    for (const effect of ability.effects) {
      switch (effect.type) {
        case 'damage':
          this.applyDamageEffect(effect, caster, target, targetPosition, ability);
          break;
        case 'heal':
          this.applyHealEffect(effect, caster, target);
          break;
        case 'buff':
        case 'debuff':
          this.applyStatusEffect(effect, caster, target);
          break;
        case 'teleport':
          this.applyTeleportEffect(effect, caster, targetPosition);
          break;
        case 'summon':
          this.applySummonEffect(effect, caster, targetPosition);
          break;
        case 'transform':
          this.applyTransformEffect(effect, caster);
          break;
      }
    }
  }

  private applyDamageEffect(
    effect: AbilityEffect, 
    caster: GameEntity, 
    target?: GameEntity, 
    targetPosition?: Vector2,
    ability?: Ability
  ): void {
    const damage = effect.value;
    
    if (effect.target === 'enemy' && target) {
      this.dealDamage(caster, target, damage);
    } else if (effect.target === 'area' && targetPosition && ability) {
      // Find all enemies in area
      // This would be implemented with the entity system
      console.log(`Area damage: ${damage} at position`, targetPosition);
    } else if (effect.target === 'all') {
      // Damage all enemies
      console.log(`Global damage: ${damage}`);
    }
  }

  private applyHealEffect(effect: AbilityEffect, caster: GameEntity, target?: GameEntity): void {
    const healTarget = target || caster;
    const combat = healTarget.components.get('combat');
    if (combat) {
      combat.health = Math.min(combat.maxHealth, combat.health + effect.value);
    }
  }

  private applyStatusEffect(effect: AbilityEffect, caster: GameEntity, target?: GameEntity): void {
    const statusTarget = target || caster;
    const combat = statusTarget.components.get('combat');
    if (combat && effect.statusEffect) {
      combat.statusEffects.push(effect.statusEffect);
    }
  }

  private applyTeleportEffect(effect: AbilityEffect, caster: GameEntity, targetPosition?: Vector2): void {
    if (targetPosition) {
      caster.transform.position = { ...targetPosition };
    }
  }

  private applySummonEffect(effect: AbilityEffect, caster: GameEntity, targetPosition?: Vector2): void {
    // Create summon entity
    console.log(`Summoning entity at`, targetPosition);
  }

  private applyTransformEffect(effect: AbilityEffect, caster: GameEntity): void {
    // Apply transformation
    console.log(`Transforming entity ${caster.id}`);
  }

  private dealDamage(attacker: GameEntity, target: GameEntity, damage: number): void {
    const targetCombat = target.components.get('combat');
    if (!targetCombat) return;

    const finalDamage = Math.max(1, damage - (targetCombat.defense || 0));
    targetCombat.health -= finalDamage;

    console.log(`${attacker.id} dealt ${finalDamage} damage to ${target.id}`);
  }

  public updateCooldowns(deltaTime: number): void {
    for (const [abilityId, cooldown] of this.cooldowns.entries()) {
      const newCooldown = Math.max(0, cooldown - deltaTime);
      if (newCooldown <= 0) {
        this.cooldowns.delete(abilityId);
      } else {
        this.cooldowns.set(abilityId, newCooldown);
      }
    }
  }

  public getCooldown(abilityId: string): number {
    return this.cooldowns.get(abilityId) || 0;
  }

  public isOnCooldown(abilityId: string): boolean {
    return this.getCooldown(abilityId) > 0;
  }

  public getAbilityDamage(abilityId: string, level: number): number {
    const ability = this.getAbility(abilityId);
    if (!ability) return 0;

    return ability.damage + (ability.scaling.damagePerLevel * (level - 1));
  }

  public getAbilityCooldown(abilityId: string, level: number): number {
    const ability = this.getAbility(abilityId);
    if (!ability) return 0;

    return Math.max(0.1, ability.cooldown - (ability.scaling.cooldownReductionPerLevel * (level - 1)));
  }

  public getAbilityManaCost(abilityId: string, level: number): number {
    const ability = this.getAbility(abilityId);
    if (!ability) return 0;

    return Math.max(1, ability.manaCost - (ability.scaling.manaCostReductionPerLevel * (level - 1)));
  }

  public getAbilityRange(abilityId: string, level: number): number {
    const ability = this.getAbility(abilityId);
    if (!ability) return 0;

    return ability.range + (ability.scaling.rangeIncreasePerLevel * (level - 1));
  }
}