package smoothalgo.service;

import smoothalgo.domain.Beneficiary;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link Beneficiary}.
 */
public interface BeneficiaryService {

    /**
     * Save a beneficiary.
     *
     * @param beneficiary the entity to save.
     * @return the persisted entity.
     */
    Beneficiary save(Beneficiary beneficiary);

    /**
     * Get all the beneficiaries.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Beneficiary> findAll(Pageable pageable);

    /**
     * Get the "id" beneficiary.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Beneficiary> findOne(Long id);

    /**
     * Delete the "id" beneficiary.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
